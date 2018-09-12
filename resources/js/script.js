// serve up stuff from here!

function testConsole() {
  console.clear();
  console.log("Gif Array: ", initGifArray);
  console.log("Current Button Index: ", buttonIndex);
}

var initGifArray = ["Steve Wilhite", "Computer Science"];
var buttonIndex = 0;

// function that iterates through array and creates a button for each item in array
function createButtons(array) {
  $.each(array, function() {
    var gifCategoryButton = $("<button>");
    gifCategoryButton.attr("data-button-id", buttonIndex);
    gifCategoryButton.addClass("gif-category-button m-2");
    gifCategoryButton.text(array[buttonIndex]);
    $("#button-holder").append(gifCategoryButton);
    buttonIndex++;
  });
}
createButtons(initGifArray);
testConsole();

// click handler for add category button
$("#add-category").on("click", function(event) {
  var userCategoryToAdd = $("#user-category-to-add");
  event.preventDefault();
  // TODO: Confirm there's text in the box.
  if (userCategoryToAdd.val().trim() !== "") {
    // add user's category to the array
    initGifArray.push(userCategoryToAdd.val().trim());

    // TODO: update DOM with new array contents (hint: completely clear the div then re-pop)

    $("#button-holder").empty();
    buttonIndex = 0;
    createButtons(initGifArray);
    // clear text box
    userCategoryToAdd.val("");
  } else {
    alert("Please enter a new category");
  }
});

// click handler for category buttons
$(document).on("click", ".gif-category-button", function() {
  console.log(
    "You clicked the button with text of",
    initGifArray[$(this).attr("data-button-id")]
  );
  testConsole();
});
