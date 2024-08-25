// Toggle chat widget visibility
document.getElementById('chatIcon').addEventListener('click', function () {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'block';
    } else {
        chatWidget.style.display = 'none';
    }
});

// Close chat widget when 'X' is clicked
document.querySelectorAll('#closeChat').forEach(function (element) {
    element.addEventListener('click', function () {
        document.getElementById('chatWidget').style.display = 'none';
    });
});

document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    // Display user's message
    const chatMessages = document.getElementById('chatMessages');
    const userMessage = document.createElement('div');
    userMessage.textContent = 'You: ' + userInput;
    chatMessages.appendChild(userMessage);

    // Send message to Django backend
    fetch('/chatbot-response/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}'
        },
        body: JSON.stringify({ 'message': userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot's response
        const botMessage = document.createElement('div');
        botMessage.textContent = 'Bot: ' + data.response;
        chatMessages.appendChild(botMessage);
    });

    // Clear the input
    document.getElementById('userInput').value = '';
});
