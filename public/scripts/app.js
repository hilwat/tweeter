/*
 * Client-side JS logic
 */

 $(document).ready(function() {


  function renderTweets(tweets) {
    var $tweet = $("<article>").addClass("tweet");
    tweets.forEach(tweet => createTweetElement(tweet));
  }
  //creates new tweets with the correct information

  //function to calculate the time
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

  //Creates a Tweet
  function createTweetElement(tweet){
  // references date function above
  var $days = timeSince(`${tweet.created_at}`);
  $('main.container .tweet-container').prepend(`
    <article class="whole-tweet">
    <header>
    <div class="target-header">
    <img class="avatar" src=${tweet.user.avatars.small} >
    <h3 class="username" >${tweet.user.name}</h3>
    </div>
    <a class="handler">${tweet.user.handle}</a>
    </header>
    <a class="old-tweet">${tweet.content.text}</a>
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
  $('.charlengthlittle, .charlengthmany').hide(); //error messages

  let tweettext = $('.new-tweet textarea').val();
  let stringData = $(this).serialize();
  //no characters error
  if(tweettext.length <= 0){
    $('.charlengthlittle').toggle();
  }
  //too many characters error
  else if(tweettext.length > 140 ){
    $('.charlengthmany').toggle();
  }
  else {
  //posting and clearing text space
  $.ajax("/tweets", {data: stringData, method: 'POST'}).then(function(requestedstring){
    loadTweets();
    $('.new-tweet textarea').val('');
  })
}
})
});

  // Compose button hide & show with fancy slide at speed 400

  $('#composing-hideshow').on('click', function(){
    $('.new-tweet').slideToggle(400, function(){
      $('.container form textarea').select();
    })
  })

   //Lodds the tweets
   function loadTweets(){
  $('.tweet-container').empty(); //clears all
  $.ajax('/tweets', {method: 'GET'}).then(function(tweet){
    renderTweets(tweet);
  })
  }

  loadTweets();

});






