var upperEl = $("#upper");
var lowerEl = $("#lower");
var fullEl = $("#full");
var createEl = $("#create");
var typeWorkoutEl = $("#type-workout");
var searchInput = $("#text-bar");
var exerciseList;
var test=[];
var upperBody;
var lowerBody;
var chosenListEl = $("#chosen-list");
var exerciseListOjbect 
var setsEl = $(".sets");
var repsEl = $(".reps");
var upperBodyDefault = ['dumbbell bench press', 'dumbbell biceps curl', 'dumbbell bent over row', 'dumbbell seated shoulder press', 'dumbbell seated triceps extension'];
var lowerBodyDefault = ['dumbbell squat', 'dumbbell deadlift', 'walking lunge', 'barbell glute bridge', 'dumbbell standing calf raise'];
var fullBodyDefault = ['dumbbell bench press', 'dumbbell deadlift', 'dumbbell bent over row', 'walking lunge', 'dumbbell push press'];

// retrieves a quote and puts it on the top of the main page for now

function getQuote() {
  fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var randomQuote=Math.floor(Math.random()*1643);
    var author
    if (!data[randomQuote].author) {
      author = 'Unknown';
    } else {
      author = data[randomQuote].author;
    }
    $('.main').prepend('<div style="font-style:italic;width:100%;height:auto;">' + data[randomQuote].text + '<div style="margin-left:40%;font-style:normal;"> -' + author + '</div></div>');
  });
}

// gets all data from API and saves it locally

function getAllExercises() {
  fetch("https://exercisedb.p.rapidapi.com/exercises", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      "x-rapidapi-key": "8605916b99mshaa4c5335b3c5676p1b53a9jsn004d4aba7c60",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log("got API"); // here temp to let me know the API was got
      localStorage.setItem("allExercises", JSON.stringify(data));
      exerciseList = data;
    })
    .catch((err) => {
      console.error(err);
    });
}

// if data is already local get that, if not get API

function localOrApi() {
  exerciseList = JSON.parse(localStorage.getItem("allExercises"));
  if (exerciseList == null) {
    getAllExercises();
  }
}

localOrApi();
getQuote();

// this is a test search returning exercises that meet the lised conditions

function generateListByName(name) {

  for (i = 0; i < exerciseList.length; i++) {
    if (exerciseList[i].name === name) {
      test.push(exerciseList[i]);
      var temp = test.length - 1;
      test[temp].reps = 1;
      test[temp].sets = 1;
    }
  }
}

// builds exercise cards and places them in the main page

function buildCardsFromList() {
    for (i = 0; i < test.length; i++) {
          var pic = test[i].gifUrl;
          chosenListEl.append(
            '<li class="ex ui-state-default">' + 
            '<button data-pos="' + i + '">X</button>' + 
            '<div class="pure-g">' +
            '<div class="sidebar pure-u-1-3">' +
            '<div style="text-align:center;font-size: .5vw;">Click Below</div>' +
            '<img class="hide" style=width:100%;height:auto;" src="' +
            pic + '"></div>' +
            '<div class="content pure-u-2-3">' +
            '<p>Name: ' + test[i].name + '</p>' +
            '<p>Muscle target: ' + test[i].target + '</p>' +
            '<p>Sets: ' + 
            '<input type="number" data-pos="' + i + '" class="sets" min="1" value="' + test[i].sets + '"></p>' +
            '<p>Reps: ' +
            '<input type="number" data-pos="' + i + '" class="reps" min="1" value="' + test[i].reps + '"></p>' +
            '<p>Equipment: ' + test[i].equipment + '</p>' +
            '</div></div></li>')
        
    }
}

// change color when clicked

createEl.on("click", function () {
  createEl.css("background-color", "darkgoldenrod");
  upperEl.css("background-color", "");
  lowerEl.css("background-color", "");
  fullEl.css("background-color", "");
});

upperEl.on("click", function () {
  createEl.css("background-color", "");
  upperEl.css("background-color", "darkgoldenrod");
  lowerEl.css("background-color", "");
  fullEl.css("background-color", "");
  chosenListEl.html("");
  test=[];
  for (v=0; v < upperBodyDefault.length; v++) {
      generateListByName(upperBodyDefault[v]);
  };
  buildCardsFromList();
});

lowerEl.on("click", function () {
  createEl.css("background-color", "");
  upperEl.css("background-color", "");
  lowerEl.css("background-color", "darkgoldenrod");
  fullEl.css("background-color", "");
  chosenListEl.html("");
  test=[];
  for (v=0; v < lowerBodyDefault.length; v++) {
    generateListByName(lowerBodyDefault[v]);
  };
  buildCardsFromList();
});

fullEl.on("click", function () {
  createEl.css("background-color", "");
  upperEl.css("background-color", "");
  lowerEl.css("background-color", "");
  fullEl.css("background-color", "darkgoldenrod");
  chosenListEl.html("");
  test=[];
  for (v=0; v < fullBodyDefault.length; v++) {
    generateListByName(fullBodyDefault[v]);
  };
  buildCardsFromList();
});

// make exercise cards a sortable list 

$(function () {
  $("#chosen-list").sortable();
});

// open and close the GIF

chosenListEl.on("click", ".sidebar", function (event) {
  event.stopPropagation();
  $(this).find("img").toggleClass("hide");
  
});

// remove the card ele and remove exercise from test array

chosenListEl.on('click', 'button', function() {
    test.splice($(this).data('pos'), 1);
    $(this).parent().remove();
});

// both of these listen for clicks on the reps and sets and then writes to the test array

chosenListEl.on('click', '.sets', function() {
    test[$(this).data('pos')].sets = $(this).val();  
});

chosenListEl.on('click', '.reps', function() {
    test[$(this).data('pos')].reps = $(this).val();    
});

// Paige's stuff

let filteredExerciseList = []
// console.log(exerciseList)

filteredExerciseList = exerciseList.filter(function(exercise) {
  return (exercise.equipment.toLowerCase().indexOf('body weight') > -1) + 
  (exercise.equipment.toLowerCase().indexOf('dumbbell') > -1) + 
  (exercise.equipment.toLowerCase().indexOf('barbell') > -1) + 
  (exercise.equipment.toLowerCase().indexOf('weighted') > -1);
})

console.log(filteredExerciseList)

let filteredList = [];
// console.log(exerciseList);
// console.log(exerciseList[3].name)

$('#text-bar').on('keyup', event => {
    console.log($(event.currentTarget).val())
    filteredList = filteredExerciseList.filter(function(exercise) {
      return exercise.name.toLowerCase().indexOf($(event.currentTarget).val().toLowerCase()) > -1;
      })
      console.log(filteredList)
})




