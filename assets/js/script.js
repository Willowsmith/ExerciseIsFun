var upperEl = $("#upper");
var lowerEl = $("#lower");
var fullEl = $("#full");
var createEl = $("#create");
var typeWorkoutEl = $("#type-workout");
var searchInput = $("#text-bar");
var exerciseList;
var currentWorkoutList=[];
var upperBody;
var lowerBody;
var chosenListEl = $("#chosen-list");
var exerciseListEl = $("#exercise-list");
var exerciseListOjbect 
var setsEl = $(".sets");
var repsEl = $(".reps");
var imgUrlToggle = false;
var closeModalEl = $("#closeModal");
var printBtnEl = $("#printbtn");
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
    $('.main').prepend('<div class="quote pure-u-1"><div style="font-style:italic;width:100%;height:auto;color:#DBD8E3;">' + data[randomQuote].text + '<div style="margin-left:40%;font-style:normal;color:#DBD8E3"> -' + author + '</div></div></div>');
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

// this is a search returning exercises that meet the name

function generateListByName(name) {

  for (i = 0; i < exerciseList.length; i++) {
    if (exerciseList[i].name === name) {
      currentWorkoutList.push(exerciseList[i]);
      var temp = currentWorkoutList.length - 1;
      currentWorkoutList[temp].reps = 8;
      currentWorkoutList[temp].sets = 3;
    }
  }
}

// builds exercise cards and places them in the main page

function buildCardsFromList() {
  chosenListEl.html("");
    for (i = 0; i < currentWorkoutList.length; i++) {
          var pic = currentWorkoutList[i].gifUrl;
          chosenListEl.append(
            '<div class="ex ui-state-default pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4">' + 
            '<button data-pos="' + i + '">X</button>' + 
            '<div class="pure-g">' +
            '<div class="sidebar pure-u-1-3">' +
            '<div style="text-align:center;font-size: .5vw;">Click Below</div>' +
            '<img data-pos="' + i + '" class="gif" style="width:100%; height:auto;" src="./assets/images/placeholder.png"></div>' +
            // '<img class="hide" style=width:100%;height:auto;" src="' +
            // pic + '"></div>' +
            '<div class="content pure-u-2-3">' +
            '<p>Name: ' + currentWorkoutList[i].name + '</p>' +
            '<p>Muscle target: ' + currentWorkoutList[i].target + '</p>' +
            '<p>Sets: ' + 
            '<input style="width: 20%;" type="number" data-pos="' + i + '" class="sets" min="1" value="' + currentWorkoutList[i].sets + '"></p>' +
            '<p>Reps: ' +
            '<input style="width: 20%;" type="number" data-pos="' + i + '" class="reps" min="1" value="' + currentWorkoutList[i].reps + '"></p>' +
            '<p>Equipment: ' + currentWorkoutList[i].equipment + '</p>' +
            '</div></div></div>')
        
    }
}

// change color when clicked

createEl.on("click", function () {
  createEl.css("background-color", "darkgoldenrod");
  upperEl.css("background-color", "");
  lowerEl.css("background-color", "");
  fullEl.css("background-color", "");
  $('#type-workout').addClass('hide');
  $('#final-buttons').removeClass('hide');
  $('h3').addClass('hide')
});

upperEl.on("click", function () {
  createEl.css("background-color", "");
  upperEl.css("background-color", "darkgoldenrod");
  lowerEl.css("background-color", "");
  fullEl.css("background-color", "");
  $('#type-workout').addClass('hide');
  $('#final-buttons').removeClass('hide');
  $('h3').addClass('hide')
  chosenListEl.html("");
  currentWorkoutList=[];
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
  $('#type-workout').addClass('hide');
  $('#final-buttons').removeClass('hide');
  $('h3').addClass('hide')
  chosenListEl.html("");
  currentWorkoutList=[];
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
  $('#type-workout').addClass('hide');
  $('#final-buttons').removeClass('hide');
  $('h3').addClass('hide')
  chosenListEl.html("");
  currentWorkoutList=[];
  for (v=0; v < fullBodyDefault.length; v++) {
    generateListByName(fullBodyDefault[v]);
  };
  buildCardsFromList();
});

$('#submitbtn').on("click", function () {
  $('h2').addClass('hide');
  $('#type-workout').addClass('hide');
  $('#final-buttons').addClass('hide');
  $('#after-submit').removeClass('hide');
});

$('#revertbtn').on("click", function () {
  $('h2').removeClass('hide');
  $('#final-buttons').removeClass('hide');
  $('#after-submit').addClass('hide');
});

$('#clearbtn').on('click', function() {
  $('#type-workout').removeClass('hide');
  $('#final-buttons').addClass('hide');
  $('h3').removeClass('hide')
  chosenListEl.html("");
  currentWorkoutList=[];
  buildCardsFromList();
})
// make exercise cards a sortable list 

$(function () {
  $("#chosen-list").sortable();
});

// open and close the GIF

chosenListEl.on("click", ".gif", function () {
  
  var imgUrlPos = $(this).data('pos')
  if (!imgUrlToggle) {
    $(this).attr('src', currentWorkoutList[imgUrlPos].gifUrl);
    imgUrlToggle=true;
  } else {
    $(this).attr('src', './assets/images/placeholder.png');
    imgUrlToggle=false;
  }
  
});

// remove the card ele and remove exercise from currentWorkoutList array

chosenListEl.on('click', 'button', function() {
  currentWorkoutList.splice($(this).data('pos'), 1);
    $(this).parent().remove();
});

// both of these listen for clicks on the reps and sets and then writes to the currentWorkoutList array

chosenListEl.on('click', '.sets', function() {
  currentWorkoutList[$(this).data('pos')].sets = $(this).val();  
});

chosenListEl.on('click', '.reps', function() {
  currentWorkoutList[$(this).data('pos')].reps = $(this).val();    
});

closeModalEl.on('click', function() {
    $('.container').toggleClass('hide');
});

function displayFinalList () {
  exerciseListEl.html("");
  for (q=0; q < finalList.length; q++) {
    exerciseListEl.append(
      '<li title="Click to add to list" class="modalLi" data-name="' + finalList[q].name + '">NAME: ' + finalList[q].name + '<br>EQUIP: ' + finalList[q].equipment + '</li>'
      )
  }
};

printBtnEl.on('click', function(event) {
  event.stopPropagation;
  window.print();
})

$(document).tooltip();

exerciseListEl.on('click', '.modalLi', function() {
  
  generateListByName($(this).data('name'));
  buildCardsFromList();
})

//Paige's Stuff

// We're only using exercises included in the list (equipFilteredList). When the modal opens I want to be creating a 'chosen list' based off of the search bar, checked boxes or both. 
let equipFilteredList = [];

function filterByEquipment() {
  equipFilteredList = exerciseList.filter(function(exercise) {
    return (exercise.equipment.toLowerCase().indexOf('body weight') > -1) + 
    (exercise.equipment.toLowerCase().indexOf('dumbbell') > -1) + 
    (exercise.equipment.toLowerCase().indexOf('barbell') > -1) + 
    (exercise.equipment.toLowerCase().indexOf('weighted') > -1);
  })
  // console.log(equipFilteredList)
}

let searchFilteredList = [];
let checkFilteredList = [];
let finalList = [];

$("input:radio").on("change", event => {
  filterByEquipment();
  
  checkFilteredList = equipFilteredList.filter(function(i) {
    return i.target.indexOf($(event.currentTarget).val()) > -1;
  })
  // console.log(checkFilteredList)
  finalList = checkFilteredList.filter(function(e) {
    return e.name.toLowerCase().indexOf($('#text-bar').val().toLowerCase()) > -1
  })
  $(event.currentTarget).toggleClass('active')
  displayFinalList();
  // console.log(finalList)
})

$('#text-bar').on('keyup', event => {
  filterByEquipment();
  searchFilteredList = equipFilteredList.filter(function(i) {
    return i.name.toLowerCase().indexOf($(event.currentTarget).val().toLowerCase()) > -1;
  })
  // console.log(searchFilteredList)
  if ($('input:radio:checked')) {
    finalList = searchFilteredList.filter(function(e) {
      return e.target.indexOf($('input:radio:checked').val()) > -1
    })
  } else {
    finalList = searchFilteredList;
  }
  displayFinalList();
  // console.log(finalList)
})

//modal stuff
$('#create').on('click', function(e) {
  e.preventDefault();
  $('.container').toggleClass('hide')
});
$('#addbtn').on('click', function(e) {
  e.preventDefault();
  $('.container').toggleClass('hide')
});




