

var config = {
    apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    authDomain: "time-sheet-55009.firebaseapp.com",
    databaseURL: "https://time-sheet-55009.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
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
    var empRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newData = {
      // var newEmp = {
  
      name: train,
      role: destination,
      start: frequency,
      firstTrain: firstTrain,
      rate: empRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newData);
    // database.ref().push(newEmp);
  
  
    // Logs everything to console
    console.log(newData.name);
    console.log(newData.role);
    console.log(newData.start);
    console.log(newData.firstTrain);
    console.log(newData.rate);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#place-input").val("");
    $("#start-input").val("");
    $("#firstTrain-input").val("");
    $("#rate-input").val("");
  });
  
  var tFrequency = 9;
  var firstTime = "03:30";
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var train = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var frequency = childSnapshot.val().start;
    var firstTrain = childSnapshot.val().firstTrain;
    var empRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(train);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrain);
    console.log(empRate);
  
    // Prettify the employee start
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var empMonths= moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + empMonths);
  
    // Time apart (remainder)
    var tRemainder = empMonths % tFrequency;
    console.log(tRemainder);
  
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(frequency, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(train),
      $("<td>").text(destination),
      $("<td>").text(firstTrain),
      $("<td>").text(firstTimeConverted),
      $("<td>").text(empMonths),
      $("<td>").text(empRate),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);
  });