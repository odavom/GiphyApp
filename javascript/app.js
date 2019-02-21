/* */

$(document).ready(function(){
    console.log("ready!")

    // create array to hold buttons
    let dogs = ["boxer", "golden retriever", "pitbull"]

    function displayDogButtons() {
        $("#dogButtons").empty(); //empty buttons so don't duplicate
        for (let i = 0; i < dogs.length; i++) {
            let dogButton = $("<button>"); // assigning dogButton to make a button via jQuery
            dogButton.addClass("dog");
            dogButton.addClass("btn btn-info");
            dogButton.attr("data-dog", dogs[i]);
            dogButton.text(dogs[i]);
            $("#dogButtons").append(dogButton)
        }

    }
    
    function addDogButton() {
        $("#addDog").on("click", function() {
            let dogBreed = $("#dogInput").val().trim();
            if (dogBreed == "") {
                    return false;
            }
            dogs.push(dogBreed);

            displayDogButtons();
            return false;
        });
    }
    

    function renderDogGifs() {
        // 
        let dog = $(this).attr("data-dog");
        console.log(dog)

        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=vEMgr8VAS0m7AOnDXWhzeDTUi42ERYxx&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            // console.log(response)
            $("#dogGifsView").empty();

            let results = response.data;
            console.log(results)

            if (results == "") {
                alert("There is no gif for that.")
            }

            for (let i = 0; i < results.length; i++) {
                let dogGifDiv = $("<div>");

                let dogGifRating = $("<p>").text("Rating " + results[i].rating);

                dogGifDiv.append(dogGifRating);

                let dogGifImage = $("<img>");

                dogGifImage.attr("src", results[i].images.fixed_height_small_still.url);

                dogGifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                dogGifImage.attr("data-animate", results[i].images.fixed_height_small.url);

                dogGifImage.attr("data-state", "still");

                dogGifImage.addClass("image");

                dogGifDiv.append(dogGifImage);

                $("#dogGifsView").prepend(dogGifDiv);
            }
        });
    }
    


    displayDogButtons();
    addDogButton();

    $(document).on("click", ".dog", renderDogGifs);

    $(document).on("click", ".image", function() {
        let state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");

        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
});