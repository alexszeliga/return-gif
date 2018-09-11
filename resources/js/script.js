// serve up stuff from here!

function testConsole() {
  console.clear();
  console.log("Gif Array: ", initGifArray);
  console.log("Current Button Index: ", buttonIndex);
}

var initGifArray = ["Steve Wilhite", "Computer Science"];
var buttonIndex = 0;
$.each(initGifArray, function() {
  var gifCategoryButton = $("<button>");
  gifCategoryButton.attr("data-button-id", buttonIndex);
  gifCategoryButton.addClass("gif-category-button");
  gifCategoryButton.text(initGifArray[buttonIndex]);
  $("#button-holder").append(gifCategoryButton);
  buttonIndex++;
});
testConsole();

$(document).on("click", ".gif-category-button", function() {
  testConsole();
  console.log(
    "You clicked the button with text of",
    initGifArray[$(this).attr("data-button-id")]
  );
});
