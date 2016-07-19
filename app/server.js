var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var Twitter = require('twitter');
var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
var query = process.env.QUERY;

async.series({
  db: async.apply(connectToDb),
  twitterStream: async.apply(connectToTwitterStream)
}, initServer);

function connectToDb(cb) {
  MongoClient.connect('mongodb://127.0.0.1:27017/' + process.env.MONGODB_DB, function onDbConnect(err, db) {
    if (err)
      return cb(err);
    cb(null, db);
  });
}

function connectToTwitterStream(cb) {
  twitterClient.stream('statuses/filter', { track: query, language: 'pt' }, function onStreamConnect(stream) {
    cb(null, stream);
  });
}

function initServer(err, results) {
  if (err)
    return console.error(err);

  io.on('connection', function onSocketConnected(socket) {
    socket.emit('query', query);

    results.twitterStream.on('data', function onNewTweet(tweet) {
      if (tweet.text.indexOf('RT @') > -1)
        return;

      socket.emit('data', { id: tweet.id_str, text: tweet.text });
    });

    socket.on('classificate', function onTextClassificate(data, category, cb) {
      results.db.collection(process.env.MONGODB_COLLECTION).insert(mapDoc(data, category))
      cb();
    })

    socket.on('error', function onSocketError(err) {
      console.error(err);
    });
  });

  http.listen(8090, function onServerStart() {
    console.log('Socket server listening on port 8090');
  });
}

function mapDoc(data, category) {
  // var text = removeUrlsFromText(data.text);
  // text = removeTwitterUserMention(text);
  // text = removeHashTags(text);
  // text = removeRT(text);
  return {
    t: data.text,
    c: category.key
  };
}

function removeUrlsFromText(text) {
  return text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
}

function removeTwitterUserMention(text) {
  return text.replace(/\B@[a-z0-9_-]+/gi, '');
}

function removeHashTags(text) {
  return text.replace(/#([^\\s]*)/g, '');
}

function removeRT(text) {
  return text.replace(/^RT\s/g, '');
}