// serve up stuff from here!

function testConsole() {
  console.clear();
  console.log("Gif Array: ", initGifArray);
}

var initGifArray = ["Steve Wilhite", "Computer Science"];

// function that iterates through array and creates a button for each item in array
function createButtons(array) {
  $.each(array, function(i) {
    var gifCategoryButton = $("<button>");
    gifCategoryButton.attr("data-button-id", i);
    gifCategoryButton.addClass("gif-category-button m-2");
    gifCategoryButton.text(array[i]);
    $("#button-holder").append(gifCategoryButton);
  });
}
createButtons(initGifArray);
// testConsole();

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
    // create buttons
    createButtons(initGifArray);
    // clear text box
    userCategoryToAdd.val("");
  } else {
    // if there's not text, pop an alert even though they suck.
    alert("Please enter a new category");
  }
});
$("#user-category-to-add").on("keydown", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});
// click handler for category buttons
$(document).on("click", ".gif-category-button", function() {
  // testConsole();
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
      var staticImageUrl = response.data[i].images.fixed_width_still.url;
      var animatedImageUrl = response.data[i].images.fixed_width.url;
      var eachImageGetsItsCol = $("<div>");
      eachImageGetsItsCol.addClass("col-3 mb-2");
      // place images on DOM
      var staticImage = $("<img>");
      staticImage.addClass("gif-option");
      staticImage.attr("src", staticImageUrl);
      staticImage.attr("data-gif-url", animatedImageUrl);
      staticImage.attr("data-static-url", staticImageUrl);
      staticImage.attr("data-animated", false);
      eachImageGetsItsCol.append(staticImage);
      $("#gif-holder").prepend(eachImageGetsItsCol);
      // staticUrls.push(staticImageUrl);
      // animatedUrls.push(animatedImageUrl);
    });
  });
});

// click handler for individual gifs

$(document).on("click", ".gif-option", function() {
  if ($(this).data("animated") === false) {
    $(this).attr("src", $(this).data("gif-url"));
    $(this).data("animated", true);
  } else {
    $(this).attr("src", $(this).data("static-url"));
    $(this).data("animated", false);
  }
});
