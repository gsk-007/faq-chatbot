const messagesContainer = document.querySelector("#messages");
const conversationList = document.querySelector("#conversation-list");
const chatTitle = document.querySelector("#chat-title");
const typingIndicator = document.querySelector("#typing-indicator");
const sendButton = document.querySelector("#send-btn");
const messageInput = document.querySelector("#message-input");

export function clearMessages() {
  messagesContainer.innerHTML = "";
}

export function setChatTitle(title) {
  chatTitle.textContent = title;
}

export function renderConversation(conversation, active = false) {
  const item = document.createElement("div");

  item.className = "conversation-item";

  if (active) {
    item.classList.add("active");
  }

  item.dataset.id = conversation.id;
  item.textContent = conversation.title;

  conversationList.appendChild(item);

  return item;
}

export function renderConversationList(conversations, activeId) {
  conversationList.innerHTML = "";

  conversations.forEach((conversation) => {
    renderConversation(
      conversation,
      conversation.id === activeId
    );
  });
}

export function renderMessage(sender, content) {
  const message = document.createElement("div");

  message.className = `message ${sender}`;

  message.innerHTML = marked.parse(content);

  messagesContainer.appendChild(message);

  scrollToBottom();

  return message;
}

export function removeEmptyState() {
  const empty = messagesContainer.querySelector(".empty-state");

  if (empty) {
    empty.remove();
  }
}

export function setTyping(show) {
  typingIndicator.classList.toggle("hidden", !show);
}

export function setLoading(loading) {
  sendButton.disabled = loading;
  messageInput.disabled = loading;
}

export function scrollToBottom() {
  messagesContainer.scrollTop =
    messagesContainer.scrollHeight;
}

export function clearInput() {
  messageInput.value = "";
}

export function getInputValue() {
  return messageInput.value;
}

export function focusInput() {
  messageInput.focus();
}

export {
  messageInput,
  sendButton,
  conversationList,
};