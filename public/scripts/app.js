/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {



function renderTweets(tweets) {

 var $tweet = $("<article>").addClass("tweet");

tweets.forEach(tweet => createTweetElement(tweet));

}

  function createTweetElement(tweet){

    var $days = `${tweet.created_at}`;

  $('main.container .tweet-container').append(`
    <article>
      <header>
        <div>
        <img class="avatar" src=${tweet.user.avatars.small} >
        <h3 class="username" >${tweet.user.name}</h3>
      </div>
        <a class="handler">${tweet.user.handle}</a>
      </header>
      <body>
      <a class="old-tweet">${tweet.content.text}</a>
      </body>
      <footer>
        <a>${$days}</a>
        <span class="icons">
        <i class="fas fa-flag" ></i>
        <i class="fas fa-retweet" ></i>
        <i class="fas fa-heart" ></i>
      </span>
      </footer>
    </article>
    `);

};

$(function(){
 $("form").submit(function(event){
    alert("This has been blocked");
        event.preventDefault();
    });


  renderTweets(data);
});

});






