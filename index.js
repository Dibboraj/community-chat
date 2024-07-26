// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIn4ZYNOx7SIyUPSOF33Oo7JqiQv03eoo",
  authDomain: "webxchatd.firebaseapp.com",
  databaseURL: "https://webxchatd-default-rtdb.firebaseio.com",
  projectId: "webxchatd",
  storageBucket: "webxchatd.appspot.com",
  messagingSenderId: "162184174166",
  appId: "1:162184174166:web:33b5a740bcf9006d5639f7",
  measurementId: "G-4FYVT0Z4VD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
