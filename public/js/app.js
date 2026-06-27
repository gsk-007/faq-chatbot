import {
  conversationList,
  messageInput,
  sendButton,
} from "./ui.js";

import {
  createNewConversation,
  getActiveConversation,
  getConversations,
  openConversation,
  sendCurrentMessage,
  removeConversation,
  renameConversation
} from "./chat.js";

const newChatButton = document.querySelector("#new-chat-btn");

/* ---------------- Init ---------------- */

function init() {
  const conversations = getConversations();

  if (conversations.length > 0) {
    openConversation(conversations[0].id);
  }

  autoResizeTextarea();
}

init();

/* ---------------- Events ---------------- */

newChatButton.addEventListener(
  "click",
  createNewConversation
);

sendButton.addEventListener(
  "click",
  sendCurrentMessage
);

messageInput.addEventListener(
  "keydown",
  async (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      await sendCurrentMessage();
    }
  }
);

conversationList.addEventListener(
  "click",
  async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const id = target.dataset.id;

    if (typeof id !== "string") {
      return;
    }

    if (target.classList.contains("rename-btn")) {
      event.stopPropagation();

      await renameConversation(id);

      return;
    }

    if (target.classList.contains("delete-btn")) {
      event.stopPropagation();

      await removeConversation(id);

      return;
    }

    const item = target.closest(
      ".conversation-item"
    );

    if (!item) {
      return;
    }

    if (getActiveConversation()?.id === id) {
      return;
    }

    await openConversation(id);
  }
);

/* ---------------- Helpers ---------------- */

function autoResizeTextarea() {
  messageInput.addEventListener(
    "input",
    () => {
      messageInput.style.height = "0px";

      messageInput.style.height =
        `${messageInput.scrollHeight}px`;
    }
  );
}