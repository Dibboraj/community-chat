// Create a reference to the chat-messages collection
const chatMessagesRef = db.collection("chat-messages");

// Create a query to get all chat messages, ordered by created_at in descending order
const chatMessagesQuery = chatMessagesRef.orderBy("created_at", "desc");

// Create an array to store the chat messages
const chatMessages = [];

// Listen for new chat messages
chatMessagesQuery.onSnapshot((snapshot) => {
// Get the changes that occurred since the last snapshot
const changes = snapshot.docChanges();

// Loop through the changes
for (const change of changes) {
// Get the message document from the change
const message = change.doc;

// Check the type of the change
switch (change.type) {
  case "added":
    // If a new message was added, insert it at the beginning of the chat messages array
    chatMessages.unshift(message);
    break;
  case "modified":
    // If a message was modified, find its index in the chat messages array and replace it with the updated message
    const index = chatMessages.findIndex((m) => m.id === message.id);
    if (index !== -1) {
      chatMessages[index] = message;
    }
    break;
  case "removed":
    // If a message was removed, find its index in the chat messages array and remove it
    const index = chatMessages.findIndex((m) => m.id === message.id);
    if (index !== -1) {
      chatMessages.splice(index, 1);
    }
    break;
  default:
    // Do nothing if the change type is not recognized
    break;
}







  const usernameInput = document.getElementById("username");

usernameInput.addEventListener("input", function() {
  // Check if the username is in lowercase
  if (!usernameInput.value.toLowerCase() === usernameInput.value) {
    // Display an error message
    alert("Username must be in lowercase");
  }

  // Check if the username contains any characters other than letters, numbers, and underscores
  if (!/^[a-z0-9_]+$/.test(usernameInput.value)) {
    // Display an error message
    alert("Username can only contain letters, numbers, and underscores");
  }
});
}

// Display the messages
displayMessages();
});

function displayMessages() {
// Clear the chat messages element
chatMessagesElement.innerHTML = "";

// Add the chat messages from the array to the chat messages element
for (const message of chatMessages) {
// Create a new chat message element
const chatMessageElement = document.createElement("div");
chatMessageElement.classList.add("chat-message");

// Set the chat message element's text
chatMessageElement.textContent = `${message.data().username}: ${message.data().message}`;

// Add the chat message element to the chat messages element
chatMessagesElement.appendChild(chatMessageElement);
}

// Scroll to the bottom of the chat messages element
chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}

// Display the messages when the page loads
displayMessages();
