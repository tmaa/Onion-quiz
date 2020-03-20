var gameStarted = false;
var subreddits = ["TheOnion", "nottheonion"];
var newHeadline = "";
var retrievedSubreddit = "";

$("#start-button").on("click", function () {
   $("#start-div").hide();
   var randNum = Math.random() < 0.5 ? 0 : 1;;
   var randNUm2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;

   var api_url = "https://www.reddit.com/r/" + subreddits[randNum] + "/new.json?sort=popular";
   
   console.log(api_url);

   $.ajax(api_url,   // request url
   {
      success: function (data, status, xhr) {    // success callback function
            console.log(data.data.children[randNUm2].data.title);

            newHeadline = data.data.children[randNUm2].data.title;
            retrievedSubreddit = data.data.children[randNum].data.subreddit;

            $("#article-headline").text(newHeadline);
      }
   });


   $("#middle-div").removeClass("hidden");
   $("#bottom-div").removeClass("hidden");
});

$("#correct-button").on("click", function () {
   console.log(newHeadline);
   console.log(retrievedSubreddit);
   if(retrievedSubreddit === "TheOnion"){
      console.log("Correct");
   }else{
      console.log("Wrong");
   }
});

$("#wrong-button").on("click", function () {
   console.log(newHeadline);
   console.log(retrievedSubreddit);
   if(retrievedSubreddit === "nottheonion"){
      console.log("Correct");
   }else{
      console.log("Wrong");
   }
});