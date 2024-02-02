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

document.getElementById("actualVote").addEventListener("submit", submitVote);

function submitVote() {

  var targetID = document.getElementById("voterId").value;
  var choice = document.querySelector('input[name="options"]:checked').value;

  var encryptedChoice = encryptData(choice);

  contactFormDB.orderByChild('voterID').equalTo(targetID).once('value')
  .then(snapshot => {
    if (snapshot.exists()) {
      // Get the key (record ID) of the matched record
      const recordKey = Object.keys(snapshot.val())[0];

      // Reference to the specific record
      const recordRef = contactFormDB.child(recordKey);

      const currentStatus = snapshot.val()[recordKey].votingStatus;

      if (currentStatus === 'not-voted' && targetID === snapshot.val()[recordKey].voterID) {

        alert('Successfully Voted!');

        window.close();

        // Update the 'status' field to true
        return recordRef.update({
          votingStatus: 'voted',
          choice: encryptedChoice,
        });

      } else {
        alert('Already Voted');
      }
    } else {
      alert('Record not found');
      return null;
    }
  })

  document.getElementById("actualVote").reset();

  function encryptData(data) {
    // Use CryptoJS to encrypt data
    var key = CryptoJS.enc.Utf8.parse(String(targetID));
    var iv = CryptoJS.enc.Utf8.parse(String(targetID));
  
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    return encrypted.toString();
  }
}