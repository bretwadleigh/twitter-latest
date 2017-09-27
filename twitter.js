//console.log('The twit is alive');
//var fs = require("fs");
var Twit = require('twit');
var dotenv = require('dotenv');
var fs = require('fs');
dotenv.config();

var T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {screen_name: 'bret4dev', count: 5};

T.get('statuses/user_timeline', params, twitData);

function twitData (err, data, response) {
  var obj = {};
  if (err) {
    obj.error = err;
    obj.response = response;
  } else {
    console.log(data);
    obj.tweets = [];
    for (var i = 0; i < data.length; i++) {
      /* obj.tweets[i].name = data[i].user.name;
      obj.tweets[i].screen_name = data[i].user.screen_name;
      obj.tweets[i].image = data[i].user.profile_image_url;
      obj.tweets[i].text = data[i].text; */

      //console.log(data[i].id + ' created at ' + data[i].created_at);

      obj.tweets[i] = {
        id: data[i].id,
        created_date: data[i].created_at,
        text: data[i].text,
        screen_name: data[i].user.screen_name,
        image: data[i].user.profile_image_url
      };
    }
  }

  //console.log(obj);

//return JSON.stringify(obj);

fs.writeFile('data/data.json',JSON.stringify(obj), function(err){
    if(err) {
      console.log(err);
    } else {
      fs.stat('data/data.json', function(err,stats){
        if(err) {
          console.log(err);
        }
        console.log(stats);
      });
    }
});

}

//module.exports = twitData;
