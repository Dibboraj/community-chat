const chatMessagesElement = document.getElementById("chat-messages");

// Create an array to store the chat messages
const chatMessages = [];

// Listen for new chat messages
chatMessagesRef.onSnapshot((snapshot) => {
  // Get the new chat messages
  const newChatMessages = snapshot.docs;

  // Add the new chat messages to the chat messages array
  chatMessages.push(...newChatMessages);
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

// Listen for new messages
chatMessagesRef.onSnapshot(displayMessages);

// Join the chat
document.getElementById("join-chat").addEventListener("click", () => {
  // ...

  // Display the messages
  displayMessages();
});

// Send a message
document.getElementById("send-message").addEventListener("click", () => {
  // ...

  // Display the messages
  displayMessages();
});
