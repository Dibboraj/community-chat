const chatMessagesElement = document.getElementById("chat-messages");








chatMessagesRef.onSnapshot((snapshot) => {
  // Get the new chat messages
  const newChatMessages = snapshot.docs;

  // Sort the new chat messages by timestamp in ascending order
  newChatMessages.sort((a, b) => a.data().timestamp - b.data().timestamp);

  // Update the chat messages element with the new chat messages
  chatMessagesElement.innerHTML = "";

  for (const newChatMessage of newChatMessages) {
    // Create a new chat message element
    const chatMessageElement = document.createElement("div");
    chatMessageElement.classList.add("chat-message");

    // Set the chat message element's text
    chatMessageElement.textContent = `${newChatMessage.data().username}: ${newChatMessage.data().message}`;

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
