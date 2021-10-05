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

// this is a test search returning exercises that meet the lised conditions

function generateListByName(name) {
//   test = [];
  for (i = 0; i < exerciseList.length; i++) {
    if (exerciseList[i].name === name) {
      test.push(exerciseList[i]);
      var temp = test.length - 1;
      test[temp].reps = 1;
      test[temp].sets = 1;
    }
  }
}

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
  generateListByName("dumbbell bench press");
  generateListByName("dumbbell biceps curl");
  generateListByName("dumbbell bent over row");
  generateListByName("dumbbell seated shoulder press");
  generateListByName("dumbbell seated triceps extension");
  buildCardsFromList();
});

lowerEl.on("click", function () {
  createEl.css("background-color", "");
  upperEl.css("background-color", "");
  lowerEl.css("background-color", "darkgoldenrod");
  fullEl.css("background-color", "");
});

fullEl.on("click", function () {
  createEl.css("background-color", "");
  upperEl.css("background-color", "");
  lowerEl.css("background-color", "");
  fullEl.css("background-color", "darkgoldenrod");
});

$(function () {
  $("#chosen-list").sortable();
});

chosenListEl.on("click", ".sidebar", function (event) {
  event.stopPropagation();
  $(this).find("img").toggleClass("hide");
  
});

chosenListEl.on('click', 'button', function() {
    test.splice($(this).data('pos'), 1);
    $(this).parent().remove();
});

chosenListEl.on('click', '.sets', function() {
    test[$(this).data('pos')].sets = $(this).val();  
});

chosenListEl.on('click', '.reps', function() {
    test[$(this).data('pos')].reps = $(this).val();    
});


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




