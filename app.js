var count = 0;
var subreddits = ["TheOnion", "nottheonion"];
var newHeadline = "";
var retrievedSubreddit = "";
var tries = 3;
var score = 0;

function makeApiCall(url, randNum, randNum2) {
   $("#article-headline").text(" ");
   console.log(url);
   count++;
   console.log(count);
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

   $("#score").text("Score: 0/10");
   $("#tries").text("Tries: 3");
});


$("#correct-button").on("click", function () {
   if(count === 10){
      console.log("End quiz");
   }
   if(retrievedSubreddit === "TheOnion"){
      console.log("Correct");
      score++;
      $("#score").text("Score: " + score + "/10");
      if(score === 10){
         gameWon();
      }else{
         var randNum = Math.random() < 0.5 ? 0 : 1;;
         var randNum2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;
      
         var api_url = "https://www.reddit.com/r/" + subreddits[randNum] + "/new.json?sort=popular";
         makeApiCall(api_url, randNum, randNum2);
      }
   }else{
      tries--;
      if(tries === 0){
         ranOutOfTries();
      }
      console.log("Wrong");
      $("#tries").text("Tries: " + tries);
   }
});

$("#wrong-button").on("click", function () {
   if(count === 10){
      console.log("End quiz");
   }
   if(retrievedSubreddit === "nottheonion"){
      console.log("Correct");
      score++;
      $("#score").text("Score: " + score + "/10");
      if(score === 10){
         gameWon();
      }else{
         var randNum = Math.random() < 0.5 ? 0 : 1;;
         var randNum2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;
      
         var api_url = "https://www.reddit.com/r/" + subreddits[randNum] + "/new.json?sort=popular";
         makeApiCall(api_url, randNum, randNum2);
      }
   }else{
      tries--;
      if(tries === 0){
         ranOutOfTries();
      }
      console.log("Wrong");
      $("#tries").text("Tries: " + tries);   
   }
});

function ranOutOfTries() {
      // Get the modal
   var modal = document.getElementById("myModal");
   modal.style.display = "block";

   $("#try-again").on("click", function () {
      modal.style.display = "none";
      tries = 3;
      score = 0;
      count = 0;
      $("#score").text("Score: 0/10");
      $("#tries").text("Tries: 3");
   });
}

function gameWon() {
   $("#article-headline").text("Congrats you passed the quiz!");

   document.getElementById("correct-button").style.visibility = "hidden";
   document.getElementById("wrong-button").style.visibility = "hidden";
};