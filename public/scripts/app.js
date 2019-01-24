/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


function renderTweets(tweets) {
  var $tweet = $("<article>").addClass("tweet");
  tweets.forEach(tweet => createTweetElement(tweet));
}
//creates new tweets with the correct information


function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

  function createTweetElement(tweet){
// date calculation for when the date was first created
    var $days = timeSince(`${tweet.created_at}`)
    $('main.container .tweet-container').prepend(`
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
// Blocks form submission - in case of too short or too long
$(function(){
 $("form").submit(function(event){
  event.preventDefault();
  let stringData = $(this).serialize();
  if(stringData.length <= 5){
    return $('.charlengthlittle').toggle()
  } if(stringData.length >= 145 ){
    return $('.charlengthmany').toggle()
  } else{
    $.ajax("/tweets", {data: stringData, method: 'POST'}).then(function(requestedstring){
    loadTweets();
      $('.new-tweet textarea').val('');
    })
  }
})
});


// Compose button hide & show

$('#composing-hideshow').on('click', function(){
  $('.new-tweet').slideToggle(400, function(){
    $('.container form textarea').select()
  })
})

// var input = document.getElementById('composing-hideshow');
// var message = document.getElementsByClassName('compose')[0];
// input.addEventListener('focus', function() {
//     message.style.display = 'block';
// });
// input.addEventListener('focusout', function() {
//     message.style.display = 'none';
// });




 ///
function loadTweets(){
$('.tweet-container').empty() //clears all
$.ajax('/tweets', {method: 'GET'}).then(function(tweet){
  renderTweets(tweet);
  })
}

loadTweets();

});






