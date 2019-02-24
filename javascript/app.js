/* */
// make sure document is ready before loading js
$(document).ready(function(){
    console.log("ready!")

    // create array to hold buttons
    let dogs = ["boxer", "golden retriever", "pitbull"]


    function displayDogButtons() {
        $("#dogButtons").empty(); //empty buttons so don't duplicate
        for (let i = 0; i < dogs.length; i++) {
            
            let dogButton = $("<button>"); // assigning dogButton to make a button via jQuery
            dogButton.addClass("dog"); //adds a class to dogButton called dog
            dogButton.addClass("btn btn-info"); //adds styling from bootstrap
            dogButton.attr("data-dog", dogs[i]); //adds attribute of data-dog to dogs[i]
            dogButton.text(dogs[i]); //adds the string value to the dog[i] to the button
            $("#dogButtons").append(dogButton) // adds a button to dogButtons div
        }

    }
    
    // function to add a dog button
    function addDogButton() {
        // when submit button is clicked it calls the function
        $("#addDog").on("click", function() {
            // create variable and assign it the value at #dogInput
            let dogBreed = $("#dogInput").val().trim();
            // if the dogBreed is an empty string don't submit
            if (dogBreed == "") {
                    return false;
            }
            // otherwise push dogBreed into the array of dogs
            dogs.push(dogBreed);
            // calls the displayDogButtons function to display
            displayDogButtons();
            return false; // this makes it so the button renders and doesn't clear itself out
        });
    }
    
    

    function renderDogGifs() { 
        // sets a variable to the button with the attribute of data-dog, an attribute placed on the button in the display dogButtons function. So dog will have the attribute of data-dog which is equal to the string in the dogs[i]
        let dog = $(this).attr("data-dog");
        console.log(dog)
        // sets a variable to the giphy api address with the dog variable
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=vEMgr8VAS0m7AOnDXWhzeDTUi42ERYxx&limit=10"
        // ajax calls to get the json object
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response)
            $("#dogGifsView").empty();

            let results = response.data;
            console.log(results)

            if (results == "") {
                alert("There is no gif for that.")
            }

            for (let i = 0; i < results.length; i++) {
                // create a div element for each result and assign that to dogGifDiv
                let dogGifDiv = $("<div>");
                // create a paragraph element for each result and assing that to dogGifRating
                let dogGifRating = $("<p>").text("Rating " + results[i].rating);
                // places the div element after the paragraph element
                dogGifDiv.append(dogGifRating);
                // create an image element and assign that to dogGifImage
                let dogGifImage = $("<img>");
                // give dogGifImage an attribute of source based on the results array using dot notation of the JSON object
                dogGifImage.attr("src", results[i].images.fixed_height_small_still.url);
                // give dGI attribute of data-still for the still images
                dogGifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                // give dGI attribute of data-animate for the animated images
                dogGifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                // give dGI attribute of data-state a value of still
                // console.log(dogGifImage);
                dogGifImage.attr("data-state", "still");
                // add image class 
                dogGifImage.addClass("image");
                // put dogGifImage after the dogGifDiv
                dogGifDiv.append(dogGifImage);
                // at dogGifsView but the dogGifDiv first
                $("#dogGifsView").prepend(dogGifDiv);
                
            }
        });
    }
    
    displayDogButtons();
    addDogButton();

    // when the document with the class of dog (buttons) is clicked it calls renderDogGifs
    $(document).on("click", ".dog", renderDogGifs);
    // when document with the class of image if clicked it runs the function 
    $(document).on("click", ".image", function() {
        let state = $(this).attr("data-state");
        // if state equal to still
        // on click animate
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");

        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
        console.log(this)
    });
});