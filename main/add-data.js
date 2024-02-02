const firebaseConfig = {
    apiKey: "AIzaSyDksvW5Dh1u4RXRdymQyJ5YZRa_fws43U8",
    authDomain: "voting-33706.firebaseapp.com",
    databaseURL: "https://voting-33706-default-rtdb.firebaseio.com",
    projectId: "voting-33706",
    storageBucket: "voting-33706.appspot.com",
    messagingSenderId: "164851374977",
    appId: "1:164851374977:web:dd2f222506a7449cb22680"
  };

  // initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("voting");

document.getElementById("voterForm").addEventListener("submit", submitForm);


function submitForm() {

  var voterID = getElementVal("voterId");
  var name = getElementVal("name");
  var gender = document.getElementById('gender').value;
  var age = getElementVal("age");
  var region = getElementVal("region");
  var votingStatus = document.getElementById('votingStatus').value;


  saveMessages(voterID, name, gender, age, region, votingStatus);

  //   reset the form
  document.getElementById("voterForm").reset();
}

const saveMessages = (voterID, name, gender, age, region, votingStatus) => {

  contactFormDB.orderByChild('voterID').equalTo(voterID).once('value')
  .then(snapshot => {
    if (snapshot.exists()) {
      alert("Voter already Exists")
    } else {
      if (age >= 18) {
        var newContactForm = contactFormDB.push();

        newContactForm.set({
          voterID: voterID, 
          name: name,
          gender: gender,
          age: age, 
          region: region,
          votingStatus,
        });
      } else {
        alert("Age must be 18 or older to submit the form");
      }
    }
  })
  
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};