// Replace with your Firebase configuration
const firebaseConfig = {
  // ...
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const messagesRef = db.collection('messages');

const messageInput = document.getElementById('message');
const sendMessageButton = document.getElementById('send-message');
const chatMessagesElement = document.getElementById('chat-messages');

let username = '';

const joinChatForm = document.createElement('form');
const usernameInput = document.createElement('input');
const joinChatButton = document.createElement('button');

joinChatForm.appendChild(usernameInput);
joinChatForm.appendChild(joinChatButton);
chatMessagesElement.appendChild(joinChatForm);

usernameInput.type = 'text';
usernameInput.placeholder = 'Enter your username';
joinChatButton.textContent = 'Join Chat';

joinChatButton.addEventListener('click', (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (username) {
    joinChatForm.remove();
    // ... rest of your code
  }
});

sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message && username) {
    messagesRef.add({
      username,
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      messageInput.value = '';
    })
    .catch((error) => {
      console.error('Error writing new message', error);
    });
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
    messageElement.textContent = `${message.username}: ${message.text}`;
    chatMessagesElement.appendChild(messageElement);
  });
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}
