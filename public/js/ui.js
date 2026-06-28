const messagesEl = document.querySelector("#messages");
const sessionsBar = document.querySelector("#sessions-bar");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-btn");
const toast = document.querySelector("#toast");

let toastTimer;

export function showToast(message, type = "error") {
  toast.className = `toast ${type} show`;
  toast.innerHTML = `<span>${type === "success" ? "✅" : "⚠️"}</span><span>${message}</span>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

export function renderSessionsBar(conversations, activeId) {
  if (!conversations.length) {
    sessionsBar.innerHTML = "";
    return;
  }
  sessionsBar.innerHTML = conversations.map((c) => `
    <div class="session-chip ${c.id === activeId ? "active" : ""}" data-id="${c.id}">
      <span class="chip-label">${c.title}</span>
      <div class="chip-actions">
        <button class="chip-btn rename-btn" data-id="${c.id}" title="Rename">✏️</button>
        <button class="chip-btn delete-btn" data-id="${c.id}" title="Delete">🗑️</button>
      </div>
    </div>
  `).join("");
}

export function clearMessages() {
  messagesEl.innerHTML = "";
}

export function renderEmptyState() {
  messagesEl.innerHTML = `
    <div class="widget-empty">
      <h3>Hi there! 👋</h3>
      <p>Ask me anything about Pixel &amp; Pine</p>
      <div class="widget-suggestions">
        <button class="suggestion-btn">What is your return policy?</button>
        <button class="suggestion-btn">Do you offer free shipping?</button>
        <button class="suggestion-btn">How do I track my order?</button>
        <button class="suggestion-btn">What payment methods do you accept?</button>
      </div>
    </div>
  `;
}

export function removeEmptyState() {
  messagesEl.querySelector(".widget-empty")?.remove();
}

export function renderMessage(sender, content) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = `
    <div class="message-bubble">${marked.parse(String(content))}</div>
    <div class="message-time">${formatTime()}</div>
  `;
  messagesEl.appendChild(div);
  scrollToBottom();
  return div;
}

export function renderSkeleton() {
  const div = document.createElement("div");
  div.className = "message assistant skeleton-msg";
  div.innerHTML = `<div class="skeleton"></div><div class="skeleton"></div>`;
  messagesEl.appendChild(div);
  scrollToBottom();
  return div;
}

export function setLoading(loading) {
  sendButton.disabled = loading;
  messageInput.disabled = loading;
}

export function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

export function clearInput() {
  messageInput.value = "";
  messageInput.style.height = "auto";
}

export function getInputValue() {
  return messageInput.value;
}

export function focusInput() {
  messageInput.focus();
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export { messageInput, sendButton, messagesEl, sessionsBar };
