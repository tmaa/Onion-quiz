var gameStarted = false;
var subreddits = ["TheOnion", "nottheonion"];
var newHeadline = "";
var retrievedSubreddit = "";
var tries = 3;
var score = 0;

function makeApiCall(url, randNum, randNum2) {
   console.log(url);

   $.ajax(url,   // request url
   {
      success: function (data, status, xhr) {    // success callback function
            newHeadline = data.data.children[randNum2].data.title;
            retrievedSubreddit = data.data.children[randNum].data.subreddit;

            $("#article-headline").text(newHeadline);
      }
   });
}

$("#start-button").on("click", function () {
   $("#start-div").hide();

   var randNum = Math.random() < 0.5 ? 0 : 1;;
   var randNum2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;

   var api_url = "https://www.reddit.com/r/" + subreddits[randNum] + "/new.json?sort=popular";
   makeApiCall(api_url, randNum, randNum2);

   $("#middle-div").removeClass("hidden");
   $("#bottom-div").removeClass("hidden");
   $("#tries").removeClass("hidden");
   $("#score").removeClass("hidden");

   $("#score").text("Score: 0");
   $("#tries").text("Tries: 3");
});


$("#correct-button").on("click", function () {
   if(retrievedSubreddit === "TheOnion"){
      console.log("Correct");
      score++;
      $("#score").text("Score: " + score);
      var randNum = Math.random() < 0.5 ? 0 : 1;;
      var randNum2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;
   
      var api_url = "https://www.reddit.com/r/" + subreddits[randNum] + "/new.json?sort=popular";
      makeApiCall(api_url, randNum, randNum2);
   }else{
      tries--;
      console.log("Wrong");
      $("#tries").text("Tries: " + tries);
   }
});

$("#wrong-button").on("click", function () {
   if(retrievedSubreddit === "nottheonion"){
      console.log("Correct");
      score++;
      $("#score").text("Score: " + score);

      var randNum = Math.random() < 0.5 ? 0 : 1;;
      var randNum2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;
   
      var api_url = "https://www.reddit.com/r/" + subreddits[randNum] + "/new.json?sort=popular";
      makeApiCall(api_url, randNum, randNum2);
   }else{
      tries--;
      console.log("Wrong");
      $("#tries").text("Tries: " + tries);   
   }
});