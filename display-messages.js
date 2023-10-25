const chatMessagesElement = document.getElementById("chat-messages");

// Create an array to store the chat messages
const chatMessages = [];

// Listen for new chat messages
chatMessagesRef.onSnapshot((snapshot) => {
  // Get the new chat messages
  const newChatMessages = snapshot.docs;

  // Add the new chat messages to the chat messages array
  chatMessages.push(...newChatMessages);

  // Update the chat messages element with the chat messages array
  chatMessagesElement.innerHTML = "";

  for (const message of chatMessages) {
    // Create a new chat message element
    const chatMessageElement = document.createElement("div");
    chatMessageElement.classList.add("chat-message");

    // Set the chat message element's text
    chatMessageElement.textContent = `${message.data().username}: ${message.data().message}`;

    // Add the chat message element to the chat messages element
    chatMessagesElement.appendChild(chatMessageElement);
  }
});




function displayMessages() {
  // Get the chat messages document
  const chatMessagesRef = db.collection("chat-messages").doc("all-messages");

  // Get the messages from the chat messages document
  chatMessagesRef.get().then((doc) => {
    const messages = doc.data().messages;

    chatMessagesElement.innerHTML = "";

    for (const message of messages) {
      // Create a new chat message element
      const chatMessageElement = document.createElement("div");
      chatMessageElement.classList.add("chat-message");

      // Set the chat message element's text
      chatMessageElement.textContent = `${message.username}: ${message.message}`;

      // Add the chat message element to the chat messages element
      chatMessagesElement.appendChild(chatMessageElement);
    }
  });
}

// Display the messages when the page loads
displayMessages();

// Listen for new messages
chatMessagesRef.onSnapshot(displayMessages);

// Join the chat
document.getElementById("join-chat").addEventListener("click", () => {
  // ...

  displayMessages();
});

// Send a message
document.getElementById("send-message").addEventListener("click", () => {
  // ...

  displayMessages();
});
