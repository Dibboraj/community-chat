const chatMessagesRef = db.collection("chat-messages");

// Order the chat messages by created_at in descending order
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
    if (change.type === "added") {
      // If a new message was added, insert it at the beginning of the chat messages array
      chatMessages.unshift(message);
    } else if (change.type === "modified") {
      // If a message was modified, find its index in the chat messages array and replace it with the updated message
      const index = chatMessages.findIndex((m) => m.id === message.id);
      if (index !== -1) {
        chatMessages[index] = message;
      }
    } else if (change.type === "removed") {
      // If a message was removed, find its index in the chat messages array and remove it
      const index = chatMessages.findIndex((m) => m.id === message.id);
      if (index !== -1) {
        chatMessages.splice(index, 1);
      }
    }
  }

  // Display the messages
  displayMessages();
});

function displayMessages() {
  // Clear the chat messages element
  const chatMessagesElement = document.getElementById("chat-messages");
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
