// serve up stuff from here!

function testConsole() {
  console.clear();
  console.log("Gif Array: ", initGifArray);
  console.log("Current Button Index: ", buttonIndex);
}

var initGifArray = ["Steve Wilhite", "Computer Science"];
var buttonIndex = 0;

function createButtons() {
  // TODO
  $.each(initGifArray, function() {
    var gifCategoryButton = $("<button>");
    gifCategoryButton.attr("data-button-id", buttonIndex);
    gifCategoryButton.addClass("gif-category-button m-2");
    gifCategoryButton.text(initGifArray[buttonIndex]);
    $("#button-holder").append(gifCategoryButton);
    buttonIndex++;
  });
}
createButtons();
testConsole();

// click handler for add category button
$("#add-category").on("click", function(event) {
  var userCategoryToAdd = $("#user-category-to-add");
  event.preventDefault();

  // add user's category to the array
  initGifArray.push(userCategoryToAdd.val().trim());

  // TODO: update DOM with new array contents (hint: completely clear the div then re-pop)

  $("#button-holder").empty();
  buttonIndex = 0;
  createButtons();
  // clear text box
  userCategoryToAdd.val("");
});

// click handler for category buttons
$(document).on("click", ".gif-category-button", function() {
  testConsole();
  console.log(
    "You clicked the button with text of",
    initGifArray[$(this).attr("data-button-id")]
  );
});
