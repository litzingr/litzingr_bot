console.log('litzinger_bot is starting');

var Twit = require('twit');

//const config = require('./config');
//load heroku variables into config
var config = {
  consumer_key : process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret

}
var T = new Twit(config);

//sets up user stream
var stream = T.stream('user');

//when someone tweets me, call tweetRecieve
stream.on('tweet', tweetRecieve);

function tweetCheck(err, data, response) {
  if (err) {
    console.log("Something went wrong\n" + err);
  } else {
    console.log("Tweeted: " + data.text);
  }
}

function tweetThis(text){
  var tweet = {
    status: text
  }
  T.post('statuses/update', tweet, tweetCheck);

}

function tweetReply(text, reply_id){
  var tweet = {
    status: text,
    in_reply_to_status_id: reply_id
  }
  T.post('statuses/update', tweet, tweetCheck);

}

function tweetRecieve(eventMsg){
  var replyto = eventMsg.in_reply_to_screen_name;
  var from = eventMsg.user.screen_name;
  var reply_id = eventMsg.id_str;
  var userName = eventMsg.user.name;

  console.log(replyto + " tweeted me");

  //tweet back only if it's sent to me
  if (replyto === 'litzingr_bot'){
    tweetReply('@' + from + ' Oh hai ' + userName + '! You tweeted me!',reply_id);
  }

}


//Example tweet

// var tweet = {
//   status: "Something happened that made me post"
// }
// T.post('statuses/update', tweet, tweetCheck);
