let checkFilteredList = [];
var chosenListEl = $("#chosen-list");
var closeModalEl = $("#closeModal");
var createEl = $("#create");
var currentWorkoutList = [];
var errorEl = $("#error");
let equipFilteredList = [];
var exerciseList;
var exerciseListEl = $("#exercise-list");
var fileNameEl = $("#filename");
let finalList = [];
var fullBodyDefault = [
  "dumbbell bench press",
  "dumbbell deadlift",
  "dumbbell bent over row",
  "walking lunge",
  "dumbbell push press",
];
var fullEl = $("#full");
var imgUrlToggle = false;
var loadBtnEl = $("#load");
var lowerBody;
var lowerBodyDefault = [
  "dumbbell squat",
  "dumbbell deadlift",
  "walking lunge",
  "barbell glute bridge",
  "dumbbell standing calf raise",
];
var lowerEl = $("#lower");
var printBtnEl = $("#printbtn");
var repsEl = $(".reps");
var saveBtnEl = $("#savebtn");
let searchFilteredList = [];
var searchInput = $("#text-bar");
var setsEl = $(".sets");
var typeWorkoutEl = $("#type-workout");
var upperBody;
var upperBodyDefault = [
  "dumbbell bench press",
  "dumbbell biceps curl",
  "dumbbell bent over row",
  "dumbbell seated shoulder press",
  "dumbbell seated triceps extension",
];
var upperEl = $("#upper");

// builds exercise cards and places them in the main page
// adds data-pos to later be able to connect a clicked on html element with
// the specific exercise object

function buildCardsFromList() {
  chosenListEl.html("");
  for (i = 0; i < currentWorkoutList.length; i++) {
    var pic = currentWorkoutList[i].gifUrl;
    chosenListEl.append(
      '<div class="ex ui-state-default pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4">' +
        '<button data-pos="' +
        i +
        '">X</button>' +
        '<div style="padding-top:20px;" class="pure-g">' +
        '<div class="sidebar pure-u-1-3">' +
        '<div style="text-align:center;font-size: .5vw;">Click Below</div>' +
        '<img data-pos="' +
        i +
        '" class="gif" style="width:100%; height:auto;" src="./assets/images/placeholder.png"></div>' +
        '<div style="line-height: 16px;" class="content pure-u-2-3">' +
        '<p style="font-weight: bold">' +
        currentWorkoutList[i].name +
        "</p>" +
        "<p>Muscle target: " +
        currentWorkoutList[i].target +
        "</p>" +
        "<p>Sets: " +
        '<input style="width: 20%;" type="number" data-pos="' +
        i +
        '" class="sets" min="1" value="' +
        currentWorkoutList[i].sets +
        '"></p>' +
        "<p>Reps: " +
        '<input style="width: 20%;" type="number" data-pos="' +
        i +
        '" class="reps" min="1" value="' +
        currentWorkoutList[i].reps +
        '"></p>' +
        "<p>Equipment: " +
        currentWorkoutList[i].equipment +
        "</p>" +
        "</div></div></div>"
    );
  }
}

// checks to see the load form and error message are displayed then hides them

function checkError() {
  if (!errorEl.hasClass("hide")) {
    errorEl.toggleClass("hide");
  }
  if (!$("#loadform").hasClass("hide")) {
    $("#loadform").toggleClass("hide");
  }
}

// builds list on the fly in the modal as names are searched for or muscles are clicked on

function displayFinalList() {
  exerciseListEl.html("");
  for (q = 0; q < finalList.length; q++) {
    exerciseListEl.append(
      '<li title="Click to add to list" class="modalLi" data-name="' +
        finalList[q].name +
        '"><b>' +
        finalList[q].name +
        "</b><br>Equipment: " +
        finalList[q].equipment +
        "</li>"
    );
  }
}

// Builds a filtered list

function filterByEquipment() {
  equipFilteredList = exerciseList.filter(function (exercise) {
    return (
      (exercise.equipment.toLowerCase().indexOf("body weight") > -1) +
      (exercise.equipment.toLowerCase().indexOf("dumbbell") > -1) +
      (exercise.equipment.toLowerCase().indexOf("barbell") > -1) +
      (exercise.equipment.toLowerCase().indexOf("weighted") > -1)
    );
  });
}

// Receives a name and finds it in the master exercise array from the API then adds that specific exercise to a new object
// addititioally adds reps and sets to each exercise

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

// retrieves a quote and puts it on the top of the main page for now

function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var randomQuote = Math.floor(Math.random() * 1643);
      var author;
      if (!data[randomQuote].author) {
        author = "Unknown";
      } else {
        author = data[randomQuote].author;
      }
      $(".main").prepend(
        '<div class="quote pure-u-1"><div style="font-style:italic;width:100%;height:auto;color:#DBD8E3;">' +
          data[randomQuote].text +
          '<div style="margin-left:40%;font-style:normal;color:#DBD8E3"> -' +
          author +
          "</div></div></div>"
      );
    });
}

// if data is already local get that, if not get API

function localOrApi() {
  exerciseList = JSON.parse(localStorage.getItem("allExercises"));
  if (exerciseList == null) {
    getAllExercises();
  }
}

// ***** Functions above, listeners below *****

// open up modal when add button is clicked

$("#addbtn").on("click", function (e) {
  e.preventDefault();
  $(".container").toggleClass("hide");
});

// open and close the GIF

chosenListEl.on("click", "button", function () {
  currentWorkoutList.splice($(this).data("pos"), 1);
  $(this).parent().remove();
});

// both of these listen for clicks on the reps and sets and then writes to the currentWorkoutList array

chosenListEl.on("click", ".sets", function () {
  currentWorkoutList[$(this).data("pos")].sets = $(this).val();
});

chosenListEl.on("click", ".reps", function () {
  currentWorkoutList[$(this).data("pos")].reps = $(this).val();
});

// Toggles the placeholder and exercise pictures

chosenListEl.on("click", ".gif", function () {
  var imgUrlPos = $(this).data("pos");
  if (!imgUrlToggle) {
    $(this).attr("src", currentWorkoutList[imgUrlPos].gifUrl);
    imgUrlToggle = true;
  } else {
    $(this).attr("src", "./assets/images/placeholder.png");
    imgUrlToggle = false;
  }
});

// Clear button resets the screen

$("#clearbtn").on("click", function () {
  $("#type-workout").removeClass("hide");
  $("#final-buttons").addClass("hide");
  $("h3").removeClass("hide");
  chosenListEl.html("");
  currentWorkoutList = [];
  buildCardsFromList();
});

// X button on the modal hides the modal and shows the buttons

closeModalEl.on("click", function () {
  $(".container").toggleClass("hide");
});
createEl.on("click", function () {
  $("#type-workout").toggleClass("hide");
  $("#final-buttons").toggleClass("hide");
  $("h3").toggleClass("hide");
  checkError();
});

// create button shows modal

$("#create").on("click", function (e) {
  e.preventDefault();
  checkError();
  $(".container").toggleClass("hide");
});

// When an exercise is clicked on in the modal create the card and display it

exerciseListEl.on("click", ".modalLi", function () {
  $(this).addClass("modalLiClick");
  generateListByName($(this).data("name"));
  buildCardsFromList();
});

// Hides the buttons and builds the cards based off of the full array

fullEl.on("click", function () {
  $("#type-workout").toggleClass("hide");
  $("#final-buttons").toggleClass("hide");
  $("h3").toggleClass("hide");
  checkError();
  chosenListEl.html("");
  currentWorkoutList = [];
  for (v = 0; v < fullBodyDefault.length; v++) {
    generateListByName(fullBodyDefault[v]);
  }
  buildCardsFromList();
});

// filters the list based on what radio input is clicked

$("input:radio").on("change", (event) => {
  filterByEquipment();

  checkFilteredList = equipFilteredList.filter(function (i) {
    return i.target.indexOf($(event.currentTarget).val()) > -1;
  });

  finalList = checkFilteredList.filter(function (e) {
    return (
      e.name.toLowerCase().indexOf($("#text-bar").val().toLowerCase()) > -1
    );
  });

  displayFinalList();
});

// shows load form; checks to see if given file name is found and if it is build the cards
// otherwise show error

loadBtnEl.on("click", function () {
  $("#loadform").toggleClass("hide");
  $("h3").toggleClass("hide");
});
$("#loadform").on("submit", function (event) {
  event.preventDefault();
  var saveName = $("#loadfilename").val();
  currentWorkoutList = [];
  currentWorkoutList = JSON.parse(localStorage.getItem(saveName));
  if (currentWorkoutList != null) {
    $("#loadform").toggleClass("hide");
    $("h2").addClass("hide");
    $("#type-workout").addClass("hide");
    $("#final-buttons").addClass("hide");
    $("#after-submit").removeClass("hide");
    checkError();
    buildCardsFromList();
  } else {
    $("#error").toggleClass("hide");
    currentWorkoutList = [];
  }
});

// Hides the buttons and builds the cards based off of the lower array

lowerEl.on("click", function () {
  $("#type-workout").toggleClass("hide");
  $("#final-buttons").toggleClass("hide");
  $("h3").toggleClass("hide");
  checkError();
  chosenListEl.html("");
  currentWorkoutList = [];
  for (v = 0; v < lowerBodyDefault.length; v++) {
    generateListByName(lowerBodyDefault[v]);
  }
  buildCardsFromList();
});

// displays print window

printBtnEl.on("click", function () {
  window.print();
});

// returns buttons for adding and clearing

$("#revertbtn").on("click", function () {
  $("h2").removeClass("hide");
  $("#final-buttons").removeClass("hide");
  $("#after-submit").addClass("hide");
});

// unhides save form

saveBtnEl.on("click", function () {
  $("#saveform").toggleClass("hide");
});

// saves exercise with given name to localStorage

$("#saveform").on("submit", function (event) {
  event.preventDefault();
  var saveName = fileNameEl.val();
  localStorage.setItem(saveName, JSON.stringify(currentWorkoutList));
  $("#saveform").toggleClass("hide");
});

// prepares buttson for save and print

$("#submitbtn").on("click", function () {
  $("h2").addClass("hide");
  $("#type-workout").addClass("hide");
  $("#final-buttons").addClass("hide");
  $("#after-submit").removeClass("hide");
}); 

// listens for keys on the text input in the modal

$("#text-bar").on("keyup", (event) => {
  filterByEquipment();
  searchFilteredList = equipFilteredList.filter(function (i) {
    return (
      i.name.toLowerCase().indexOf($(event.currentTarget).val().toLowerCase()) >
      -1
    );
  });

  if ($("input:radio:checked")) {
    finalList = searchFilteredList.filter(function (e) {
      return e.target.indexOf($("input:radio:checked").val()) > -1;
    });
  } else {
    finalList = searchFilteredList;
  }
  displayFinalList();
}); 

// Hides the buttons and builds the cards based off of the upper array

upperEl.on("click", function () {
  $("#type-workout").toggleClass("hide");
  $("#final-buttons").toggleClass("hide");
  $("h3").toggleClass("hide");
  checkError();
  chosenListEl.html("");
  currentWorkoutList = [];
  for (v = 0; v < upperBodyDefault.length; v++) {
    generateListByName(upperBodyDefault[v]);
  }
  buildCardsFromList();
});

// ***** listeners above misc below *****

// make exercise cards a sortable list

$(function () {
  $("#chosen-list").sortable();
});

localOrApi();
getQuote();
