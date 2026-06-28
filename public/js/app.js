import { messageInput, sendButton, messagesEl, sessionsBar } from "./ui.js";
import { initSession, openSession, renameSession, removeSession, sendCurrentMessage, startNewSession } from "./chat.js";

const chatToggle = document.querySelector("#chat-toggle");
const chatPanel = document.querySelector("#chat-panel");
const chatNew = document.querySelector("#chat-new");
const iconChat = chatToggle.querySelector(".icon-chat");
const iconClose = chatToggle.querySelector(".icon-close");
const toggleLabel = chatToggle.querySelector("span");

let isOpen = false;

/* ---- Widget toggle ---- */

function openWidget() {
  isOpen = true;
  chatPanel.classList.add("open");
  chatPanel.setAttribute("aria-hidden", "false");
  chatToggle.classList.add("open");
  iconChat.classList.add("hidden");
  iconClose.classList.remove("hidden");
  if (toggleLabel) toggleLabel.classList.add("hidden");
  initSession().then(() => messageInput.focus());
}

function closeWidget() {
  isOpen = false;
  chatPanel.classList.remove("open");
  chatPanel.setAttribute("aria-hidden", "true");
  chatToggle.classList.remove("open");
  iconChat.classList.remove("hidden");
  iconClose.classList.add("hidden");
  if (toggleLabel) toggleLabel.classList.remove("hidden");
}

chatToggle.addEventListener("click", () => {
  isOpen ? closeWidget() : openWidget();
});

/* ---- New conversation ---- */

chatNew.addEventListener("click", startNewSession);

/* ---- Send ---- */

sendButton.addEventListener("click", () => sendCurrentMessage());

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendCurrentMessage();
  }
});

/* ---- Auto-resize textarea ---- */

messageInput.addEventListener("input", () => {
  messageInput.style.height = "auto";
  messageInput.style.height = `${messageInput.scrollHeight}px`;
});

/* ---- Sessions bar ---- */

sessionsBar.addEventListener("click", (e) => {
  const id = e.target.closest("[data-id]")?.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("rename-btn")) {
    renameSession(id);
    return;
  }
  if (e.target.classList.contains("delete-btn")) {
    removeSession(id);
    return;
  }

  openSession(id);
});

/* ---- Suggestion buttons (event delegation) ---- */

messagesEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion-btn")) {
    sendCurrentMessage(e.target.textContent.trim());
  }
});
