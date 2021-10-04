var upperEl = $("#upper");
var lowerEl = $("#lower");
var fullEl = $("#full");
var createEl = $("#create");
var typeWorkoutEl = $("#type-workout");
var searchInput = $('#text-bar')
var exerciseList;
var test;
<<<<<<< HEAD
var upperBody;
var lowerBody;

=======
var exEl = $('.ex');
var chosenListEl = $('#chosen-list');
>>>>>>> dev

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

function generateCard(testsearch) {
    test = [];
    for (i=0; i < exerciseList.length; i++) {
        if (exerciseList[i].name === testsearch) { 
        test.push(exerciseList[i])
        }
    }
    var pic = test[0].gifUrl;
    chosenListEl.append('<li class="ex"><div>name: ' + test[0].name + '</div><div>Equipment: ' + test[0].equipment + '</div><div class="hide"><img style=width:100px;height:100px" src="' + pic + '"></div>');
}

// upperEl.click(search('dumbbell bench press'));

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
    chosenListEl.html('');
    generateCard('dumbbell bench press');
    generateCard('dumbbell biceps curl')

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

$(function () {
    $('#chosen-list').sortable();
});




chosenListEl.on('mouseleave', '.ex', function(event) {   
    event.stopPropagation();
    var imgEl = $(this).find(':nth-child(3)');
    imgEl.toggleClass('hide');
    
})

chosenListEl.on('mouseenter', '.ex', function(event) {   
    event.stopPropagation();
    var imgEl = $(this).find(':nth-child(3)');
    imgEl.toggleClass('hide');
    
})

chosenListEl.on('click', '.ex', function(event) {
    event.stopPropagation();
    $(this).toggleClass('overlay');  
    
})
