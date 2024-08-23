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

// Handle the send button click
document.getElementById('sendButton').addEventListener('click', function () {
    const userMessage = document.getElementById('textAreaExample').value;
    if (userMessage) {
        console.log('User message:', userMessage);
        document.getElementById('textAreaExample').value = '';  // Clear the input area
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div>User: ${userInput}</div>`;
    
    // Send message to Django backend
    fetch('/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<div>Bot: ${data.response}</div>`;
        document.getElementById('user-input').value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
