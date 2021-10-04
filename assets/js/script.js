var upperEl = $("#upper");
var lowerEl = $("#lower");
var fullEl = $("#full");
var createEl = $("#create");
var typeWorkoutEl = $("#type-workout");
var exerciseList;
var test;

// gets all data from API and saves it locally

function getAllExercises() {
    fetch("https://exercisedb.p.rapidapi.com/exercises", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            "x-rapidapi-key": "8605916b99mshaa4c5335b3c5676p1b53a9jsn004d4aba7c60"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function (data) {
        console.log('got API'); // here temp to let me know the API was got
        localStorage.setItem('allExercises', JSON.stringify(data));
        exerciseList = data;
    })
    .catch(err => {
        console.error(err);
    }); 
}

// if data is already local get that, if not get API

function localOrApi() {
    exerciseList = JSON.parse(localStorage.getItem('allExercises'));
    if (exerciseList == null) {
        getAllExercises();
    } 
}

localOrApi();

// this is a test search returning exercises that meet the lised conditions

upperEl.on('click', function() {
    test = [];
    for (i=0; i < exerciseList.length; i++) {
        if (exerciseList[i].bodyPart === 'upper arms' && exerciseList[i].target === "triceps" && (exerciseList[i].equipment === 'cable' || exerciseList[i].equipment === 'body weight')) { 
        test.push(exerciseList[i])
        }
    }
    console.log(test);
});

// change color when clicked

createEl.on('click', function() {
    createEl.css('background-color', 'darkgoldenrod');
    upperEl.css('background-color', '');
    lowerEl.css('background-color', '');
    fullEl.css('background-color', '');
})

upperEl.on('click', function() {
    createEl.css('background-color', '');
    upperEl.css('background-color', 'darkgoldenrod');
    lowerEl.css('background-color', '');
    fullEl.css('background-color', '');

})

lowerEl.on('click', function() {
    createEl.css('background-color', '');
    upperEl.css('background-color', '');
    lowerEl.css('background-color', 'darkgoldenrod');
    fullEl.css('background-color', '');
})

fullEl.on('click', function() {
    createEl.css('background-color', '');
    upperEl.css('background-color', '');
    lowerEl.css('background-color', '');
    fullEl.css('background-color', 'darkgoldenrod');
})
