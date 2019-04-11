//Insitalize Firebase
    var config = {
    apiKey: "AIzaSyBLnLv_Xn5j914haFluEowEC3xbZriav3M",
    authDomain: "train-scheduler-fb8c5.firebaseapp.com",
    databaseURL: "https://train-scheduler-fb8c5.firebaseio.com",
    projectId: "train-scheduler-fb8c5",
    storageBucket: "train-scheduler-fb8c5.appspot.com",
    messagingSenderId: "711689646983"
  };

    firebase.initializeApp(config);

    var database = firebase.database();

// button for adding schedule
    $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    // grabs user input 
    var trainame = $("#trainTime-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var traintime = $("#firstTrainTime-input").val().trim();

    // creates local object for holding schedule data
    var newData = {
    name: trainame,
    place: destination,
    start : frequency,
    time: traintime

};
    // uploads schedule data to the database
    database.ref().push(newData);

    // logs to console
    console.log(newData.name);
    console.log(newData.place);
    console.log(newData.start);
    console.log(newData.time);

alert("Schedule succesfully added");

//clear all of the text-boxes
$("#trainTime-input").val("");
$("#destination-input").val("");
$("#frequency").val("");
$("#firstTrainTime-input").val("");

});

// creates firebase event for adding schedule to the database
// and new data to the html when a user adds an entry

    database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainame = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var frequency = childSnapshot.val().start;
    var traintime = childSnapshot.val().time;
    
    console.log(trainame);
    console.log(destination);
    console.log(frequency);
    console.log(traintime);


//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);
    $().append("<p>hello</>");
        // create the new row
       var newRow = $(".output").append(
       $("<td>").text(trainame),
       $("<td>").text(destination),
       $("<td>").text(trainArrival),
       $("<td>").text(traintime) 
       );

    // Append new schedule to table
   $("#schedule-table > tbody").append(newRow);
       

});