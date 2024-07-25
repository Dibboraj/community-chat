// Replace with your Firebase configuration
const firebaseConfig = {
  // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to Firestore
const db = firebase.firestore();

// Create a reference to the chat messages collection
const chatMessagesRef = db.collection("chat-messages");

const usernameInput = document.getElementById("username");
const joinChatButton = document.getElementById("join-chat");
const chatMessagesElement = document.getElementById("chat-messages");
const messageInput = document.getElementById("message");
const sendMessageButton = document.getElementById("send-message");

let username = "";

joinChatButton.addEventListener("click", () => {
  username = usernameInput.value;
  if (username) {
    // Hide username input and join chat button
    usernameInput.style.display = "none";
    joinChatButton.style.display = "none";
  }
});

sendMessageButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message && username) {
    chatMessagesRef.add({
      username,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = "";
  }
});

chatMessagesRef.orderBy("timestamp").onSnapshot((snapshot) => {
  const messages = [];
  snapshot.forEach((doc) => {
    messages.push({ ...doc.data(), id: doc.id });
  });
  displayMessages(messages);
});

function displayMessages(messages) {
  chatMessagesElement.innerHTML = "";
  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${message.username}: ${message.message}`;
    chatMessagesElement.appendChild(messageElement);
  });
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}
