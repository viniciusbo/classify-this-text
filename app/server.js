var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');
var twitterClient = new Twitter({
  consumer_key: 'O4UmiMcM6lRs7RBL091isI5cT',
  consumer_secret: 'rQftfX1lAuCh9E9g8pcrmVO0MgWGttyTccCJVkkUfgERqrRwzs',
  access_token_key: '19972786-OeUNTvzDeWW6Y0l8bRZaDlWOEnIH7aD6rSWwEEExM',
  access_token_secret: 'qOIn1xNHtOzlvjP6Ou931ipIesBzqaoVDQTsJzUL8Nuou'
});
var twitterStream = twitterClient.stream('statuses/filter', { track: 'são paulo' });

io.on('connection', function(socket) {
  twitterStream.on('data', function(tweet) {
    socket.emit('data', { id: tweet.id_str, text: tweet.text });
  });

  socket.on('classificate', function(data, category, cb) {
    console.log(data, category);
    cb();
  })
});

http.listen(8090, function() {
  console.log('Socket server listening on port 8090');
});