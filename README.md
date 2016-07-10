# Classify this text

Manually classify text from Twitter stream to be used as training set through this easy to use interface.

## How to use

First, you should clone the repo and install the dependencies.

```bash
$ git clone git@github.com:viniciusbo/classify-this-text.git classify-this-text
$ cd classify-this-text
$ npm install
$ export TWITTER_CONSUMER_KEY="your twitter consumer key"
$ export TWITTER_CONSUMER_SECRET="your twitter consumer secret"
$ export TWITTER_ACCESS_TOKEN_KEY="your twitter access token key"
$ export TWITTER_ACCESS_TOKEN_SECRET="your twitter access token secret"
$ export MONGODB_DB="tweet_classification"
$ export QUERY="your keywords"
```

Then, launch the app.

```bash
$ npm start
```

You should see a new browser tap opening in http://127.0.0.1:8080.

## TODO

- Configurable classes

## License

ISC
