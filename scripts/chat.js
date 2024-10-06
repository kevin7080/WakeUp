document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const chatIcon = document.getElementById('chatIcon');
    const chatPopup = document.getElementById('chatPopup');
    const closeBtn = document.getElementById('closeBtn');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    /**
     * Toggles the visibility of the chat popup.
     */
    function toggleChatPopup() {
        chatPopup.classList.toggle('show');
        if (chatPopup.classList.contains('show')) {
            chatInput.focus(); // Automatically focus on input when chat is opened
        }
    }

    /**
     * Appends a message to the chat body.
     * @param {string} type - The type of message ('user', 'bot', 'error').
     * @param {string} text - The message text.
     */
    function appendMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = getMessageClass(type);
        
        if (type === 'error') {
            // For error messages, display as plain text
            messageDiv.textContent = text;
        } else {
            // For user and bot messages, allow HTML content for better formatting
            messageDiv.innerHTML = sanitizeHTML(text);
        }

        chatBody.appendChild(messageDiv);
        scrollToBottom();
    }

    /**
     * Returns the appropriate CSS class based on message type.
     * @param {string} type - The type of message ('user', 'bot', 'error').
     * @returns {string} - Corresponding CSS class.
     */
    function getMessageClass(type) {
        switch(type) {
            case 'user':
                return "user-message";
            case 'bot':
                return "bot-message";
            case 'error':
                return "error-message";
            default:
                return "";
        }
    }

    /**
     * Scrolls the chat body to the bottom.
     */
    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    /**
     * Displays a loading indicator in the chat.
     * @returns {HTMLElement} - The loading indicator element.
     */
    function showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = "loading-message";
        loadingDiv.innerHTML = `
            <div class="spinner"></div>
            <span>Typing...</span>
        `;
        chatBody.appendChild(loadingDiv);
        scrollToBottom();
        return loadingDiv;
    }

    /**
     * Removes the loading indicator from the chat.
     * @param {HTMLElement} loadingDiv - The loading indicator element to remove.
     */
    function removeLoadingIndicator(loadingDiv) {
        if (loadingDiv && loadingDiv.parentNode) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
    }

    /**
     * Sanitizes HTML to prevent XSS attacks.
     * @param {string} str - The string to sanitize.
     * @returns {string} - The sanitized string.
     */
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    /**
     * Handles form submission to send a message.
     * @param {Event} event - The form submission event.
     */
    async function handleFormSubmit(event) {
        event.preventDefault(); // Prevent page reload

        const message = chatInput.value.trim();
        if (!message) return; // Ignore if there's no message

        // Display user's message in chat
        appendMessage('user', message);

        // Clear the input field
        chatInput.value = "";

        // Display loading indicator
        const loadingIndicator = showLoadingIndicator();

        // Send the message to the backend API
        try {
            const response = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            if (response.ok) {
                const data = await response.json();
                const reply = data.reply;

                // Display bot's reply in chat
                appendMessage('bot', reply);
            } else {
                // Handle HTTP errors
                const errorData = await response.json();
                const errorMsg = errorData.error || 'Failed to fetch the GPT response';
                appendMessage('error', `Error: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('error', "Error: Unable to connect to the server.");
        } finally {
            // Remove loading indicator
            removeLoadingIndicator(loadingIndicator);
        }
    }

    // Event listeners
    chatIcon.addEventListener('click', toggleChatPopup); // Toggle chat popup on icon click
    closeBtn.addEventListener('click', toggleChatPopup); // Toggle chat popup on close button click
    chatForm.addEventListener('submit', handleFormSubmit); // Handle form submission

    /**
     * Initializes the chat interface by ensuring the chat body is scrolled to the bottom.
     */
    function initializeChat() {
        scrollToBottom();
    }

    // Initialize chat on page load
    initializeChat();
});
