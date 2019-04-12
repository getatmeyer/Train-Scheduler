

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

// 2. Button for adding Employees
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var train = $("#name-input").val().trim();
  var destination = $("#place-input").val().trim();
  var frequency = $("#start-input").val().trim();
  var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  // var empRate = $("#rate-input").val().trim();


  //track the time that the first train leaves.
  //track the frequency.
  //track the current time.
  // IF: currentTime > firstTrain 
      //THEN: add frequency to first train and try the if again.
  //ELSE: return the difference in time from the train to the current time and format it by minutes.

  // Creates local "temporary" object for holding employee data
  var newData = {
    // var newEmp = {

    name: train,
    place: destination,
    start: frequency,
    firstTrain: firstTrain,
    // rate: empRate
  };

  // Uploads employee data to the database
  database.ref().push(newData);

  // Logs everything to console
  console.log(newData.name);
  console.log(newData.place);
  console.log(newData.start);
  console.log(newData.firstTrain);

  // alert
  alert("Schedule has been successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#place-input").val("");
  $("#start-input").val("");
  $("#firstTrain-input").val("");

  return false;

  // $("#rate-input").val("");
});

var tFrequency = 9;
var firstTime = "03:30";

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.

  let data = childSnapshot.val ();
  let trains = data.name;
  let tdestination = data.place;
  let tfrequency = data.start;
  let thefirstTrain = data.firstTrain;


  // Schedule Info
  console.log(moment() + "<--current moment")
  console.log(trains);
  console.log(tdestination);
  console.log(tfrequency);
  console.log(thefirstTrain);

  

  // To calcuate the mintues til aarival, take the current time in unix subtract the FirstTrain time
  let tRemainder= moment().diff(moment.unix(thefirstTrain), "minutes") % tFrequency;
  console.log("DIFFERENCE IN TIME: " + tRemainder);

  let tMintues = tfrequency - tRemainder;
  console.log("DIFFERENCE IN TIME: " + tMintues);

  let tArrival = moment().add(tMintues, "m").format("hh:mm A");
  console.log(tMintues);
  console.log(tArrival);
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trains),
    $("<td>").text(tdestination),
    $("<td>").text(tfrequency),
    $("<td>").text(thefirstTrain),
    $("<td>").text(tMintues),
    $("<td>").text(tArrival),

  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});

