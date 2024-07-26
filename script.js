// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIn4ZYNOx7SIyUPSOF33Oo7JqiQv03eoo",
  authDomain: "webxchatd.firebaseapp.com",
  projectId: "webxchatd",
  storageBucket: "webxchatd.appspot.com",
  messagingSenderId: "162184174166",
  appId: "1:162184174166:web:33b5a740bcf9006d5639f7",
  measurementId: "G-4FYVT0Z4VD"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const messagesRef = db.collection('messages');

const messageInput = document.getElementById('message');
const sendMessageButton = document.getElementById('send-message');
const chatMessagesElement = document.getElementById('chat-messages');

function sendMessage(message) {
  messagesRef.add({
    text: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    messageInput.value = '';
  })
  .catch(error => {
    console.error('Error writing new message', error);
  });
}

sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    sendMessage(message);
  }
});

messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = messageInput.value;
    if (message) {
      sendMessage(message);
    }
  }
});

messagesRef.orderBy('timestamp')
  .onSnapshot((snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    displayMessages(messages);
  }, (error) => {
    console.error('Error listening for messages', error);
  });

function displayMessages(messages) {
  chatMessagesElement.innerHTML = '';
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    chatMessagesElement.appendChild(messageElement);
  });
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}
