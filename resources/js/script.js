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
  // Confirm there's text in the box.
  if (userCategoryToAdd.val().trim() !== "") {
    // add user's category to the array
    initGifArray.push(userCategoryToAdd.val().trim());

    // update DOM with new array contents: completely clear the div then re-pop
    $("#button-holder").empty();
    // reset button index
    buttonIndex = 0;
    // create buttons
    createButtons(initGifArray);
    // clear text box
    userCategoryToAdd.val("");
  } else {
    // if there's not text, pop an alert even though they suck.
    alert("Please enter a new category");
  }
});

// click handler for category buttons
$(document).on("click", ".gif-category-button", function() {
  testConsole();
  console.log(
    "You clicked the button with text of",
    initGifArray[$(this).attr("data-button-id")]
  );
  // ajax request to giphy
  var queryString = initGifArray[$(this).attr("data-button-id")];
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=0MeKcZzr4rYFyl6HLR40UbBaf8f9rv9A&limit=10&q=" +
    queryString;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Iterate through response.data array to place urls in above arrays
    $.each(response.data, function(i) {
      var staticImageUrl = response.data[i].images.original_still.url;
      var animatedImageUrl = response.data[i].images.original.url;
      var eachImageGetsItsOwnRow = $("<div>");
      var andAColumnToo = $("<div>");
      eachImageGetsItsOwnRow.addClass("row");
      andAColumnToo.addClass("col-12");
      // place images on DOM
      var staticImage = $("<img>");
      staticImage.addClass("m-2 gif-option");
      staticImage.attr("src", staticImageUrl);
      staticImage.attr("data-gif-url", animatedImageUrl);
      eachImageGetsItsOwnRow.append(andAColumnToo);
      andAColumnToo.append(staticImage);
      $("#gif-holder").prepend(eachImageGetsItsOwnRow);
      // staticUrls.push(staticImageUrl);
      // animatedUrls.push(animatedImageUrl);
    });
  });
});

// click handler for individual gifs

$(document).on("click", ".gif-option", function() {
  var gurl = $(this).attr("src", $(this).data("gif-url"));
  console.log(gurl);
});
