
//Initalize Firebase
var config = {
  apiKey: "AIzaSyAhk4w0qoNqHputAq_LqpKK90PIBZes7_s",
    authDomain: "train-time-240fb.firebaseapp.com",
    databaseURL: "https://train-time-240fb.firebaseio.com",
    projectId: "train-time-240fb",
    storageBucket: "train-time-240fb.appspot.com",
    messagingSenderId: "372371844347"
};

firebase.initializeApp(config);

var database = firebase.database();

// shows user the current time
$("#currentTime").append(moment().format("hh:mm A"));

// an on click button that addes trains to the table
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  // var train = $("#name-input").val().trim();
  // var destination = $("#place-input").val().trim();
  // var frequency = $("#start-input").val().trim();
  // // var firstTrain = moment($("#firstTrain-input").val().trim(),
  // //  "HH:mm").subtract(1, "years").format("X");
  //  var firstTrainTime = $("#firstTrain-input").val().trim(),
   
  var trainName = $("#name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrainTime = $("#firstTrain-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  // var firstTrain = moment($("#firstTrain-input").val().trim(),
  //  "HH:mm").subtract(1, "years").format("X");
  //  var firstTrainTime = $("#firstTrain-input").val().trim(),
   
  // Creates local "temporary" object for holding new data
  var newData = {
    name: trainName,
    destination: trainDest,
    firstTime: firstTrainTime,
    frequency: trainFreq,
    // firstTrain: firstTrain,

  };

  // Uploads employee data to the database
  database.ref().push(newData);

  // Logs everything to console
  console.log(newData.name);
  console.log(newData.destination);
  console.log(newData.firstTime);
  console.log(newData.frequency);

  // alert
  alert("Schedule has been successfully added");

  // Clears the form values after values has been stored
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

  // return false;
  // $("#rate-input").val("");
});
// create a firebase event for adding the data from the new trains
database.ref().on("child_added", function(childSnapshot,prevChildKey) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTime;
  var trainFreq = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrainTime);
  console.log(trainFreq);
  

  var firstTrnTimeConv = moment(firstTrainTime, "hh:mm a").subtract(1, "years");

  // store variable for current time
  var currentTime = moment().format("HH:mm a");
  console.log("Current Time : " + currentTime);

  var trnTimeCurrentTimeDiff = moment().diff(moment(firstTrnTimeConv), "minutes");
  
  // store time left
  var timeLeft = trnTimeCurrentTimeDiff % trainFreq;

  // calacuate and store the mintues til next train arrives
  var minutesAway = trainFreq - timeLeft;
  
  // calaculate the next arriving train
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
// var tFrequency = 9;
// var firstTime = "03:30";

// var firstTimeConverted = moment(firstTime, "hh:mm a").subtract(1,"years");

// var currentTime = moment().format("HH:mm a");
// console.log("Current Time : " + currenTime);

// var 

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot,prevChildKey) {
//   console.log(childSnapshot.val());

  // Store everything into a variable.
  // let data = childSnapshot.val ();
  // let trains = data.name;
  // let tdestination = data.place;
  // let tfrequency = data.start;
  // let thefirstTrain = data.firstTrain;



  // Schedule Info
  // console.log(moment() + "<--current moment")
  // console.log(trains);
  // console.log(tdestination);
  // console.log(tfrequency);
  // console.log(thefirstTrain);

  // To calcuate the mintues til aarival, take the current time in unix subtract the FirstTrain time
  // let tRemainder= moment().diff(moment.unix(thefirstTrain), "minutes") % tFrequency;
  // console.log("DIFFERENCE IN TIME: " + tRemainder);

  // let tMintues = tfrequency - tRemainder;
  // console.log("DIFFERENCE IN TIME: " + tMintues);

  // let tArrival = moment().add(tMintues, "m").format("HH:mm a");
  // console.log(tMintues);
  // console.log(tArrival);
  
  // Create the new row
  // var newRow = $("<tr>").append(
  //   $("<td>").text(trains),
  //   $("<td>").text(tdestination),
  //   $("<td>").text(tfrequency),
  //   $("<td>").text(thefirstTrain),
  //   $("<td>").text(tMintues),
  //   $("<td>").text(tArrival),

  // );

  // Append the new row to the table
//   $("#schedule-table > tbody").append(newRow);

// });
$("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
