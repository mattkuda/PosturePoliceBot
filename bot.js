const axios = require("axios").default;
var Twit = require("twit");

// Pulling all my twitter account info from another file
var config = require("./config.js");

// Making a Twit object for connection to the API
var T = new Twit(config);

// fetch("https://type.fit/api/quotes")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data[0]);
//   });

// Make a request for a user with a given ID

var fullBody = "⚠️ 𝗣𝗢𝗦𝗧𝗨𝗥𝗘 𝗖𝗛𝗘𝗖𝗞 ⚠️\n\n";
axios
  .get("https://type.fit/api/quotes")
  .then(function (response) {
    // This is a random number bot

    while (true) {
      var randInt = Math.floor(Math.random() * response.data.length);
      // handle success
      var quoteObj = response.data[randInt];

      var quoteText = '"' + quoteObj.text + '" -' + quoteObj.author;

      fullBody += quoteText;
      console.log("At the end of the loop: " + fullBody.length)
      if (fullBody.length <= 280);
      {
        break;
      }
    }
  })
  .catch(function (error) {
    // handle error
    fullBody +=
      "Beep boop, my developer needs to fix me 🤖 " +
      Math.floor(Math.random() * 1000);
  })
  .then(function () {
    // always executed
  });

// Once every N milliseconds
setInterval(tweeter, 60 * 1 * 1000);

// //Every 4 hours
// setInterval(tweeter, 4*60*60*1000);

// Here is the bot!
function tweeter() {
  // The extremely complex tweet body
  var tweet = fullBody;

  // Post that tweet!
  T.post("statuses/update", { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success: " + data.text);
      //console.log(response);
    }
  }
}
