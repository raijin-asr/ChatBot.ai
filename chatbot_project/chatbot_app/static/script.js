const chatIcon = document.getElementById('chatIcon');
const chatWidget = document.getElementById('chatWidget');
const chatBody = document.getElementById('chatBody');
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const minimizeChat = document.getElementById('minimizeChat');
const closeChat = document.getElementById('closeChat');

chatIcon.addEventListener('click', () => {
    chatWidget.style.display = 'block';
});

minimizeChat.addEventListener('click', () => {
  chatWidget.style.display = 'none'; // Hides the chat widget
});

closeChat.addEventListener('click', () => {
  chatBody.innerHTML = ''; // Clears all chat content
  chatWidget.style.display = 'none'; // Hides the chat widget
  initializeChat(); // Re-initializes the chat
});

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessageToChat('You', userMessage);
        userInput.value = '';

        fetch('/chatbot1/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            addMessageToChat('Bot', data.response);
        });
    }
});


// Function to initialize the chat with a welcome message
function initializeChat() {
addMessageToChat('Chatbot', 'Welcome! I am Chatbot.ai. Ask me anything.');
}

// Ensure the chat is initialized when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
initializeChat();
});


function addMessageToChat(sender, message) {
const messageDiv = document.createElement('div');
messageDiv.className = 'd-flex flex-row justify-content-' + (sender === 'You' ? 'end' : 'start') + ' mb-4';
const messageContent = `
  ${sender === 'You' ? '' : '<img src="' + staticUrl + '" alt="Chatbot" style="width: 45px; height: 100%;">'}

  <div class="p-3 ${sender === 'You' ? 'me-3 border bg-body-tertiary' : 'ms-3'}" style="border-radius: 15px; ${sender === 'You' ? '' : 'background-color: rgba(57, 192, 237,.2);'}">
      <p class="small mb-0">${message}</p>
  </div>
  ${sender === 'You' ? '<img src="' + userImageUrl + '" alt="User" style="width: 45px; height: 100%;">' : ''}
`;
messageDiv.innerHTML = messageContent;
chatBody.appendChild(messageDiv);
chatBody.scrollTop = chatBody.scrollHeight;
}