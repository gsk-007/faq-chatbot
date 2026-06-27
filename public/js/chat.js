import {
  createConversation,
  deleteConversation,
  getMessages,
  sendMessage,
  updateConversation,
} from "./api.js";

import {
  clearInput,
  clearMessages,
  focusInput,
  getInputValue,
  removeEmptyState,
  renderConversationList,
  renderMessage,
  setChatTitle,
  setLoading,
  setTyping,
  showToast,
} from "./ui.js";

const STORAGE_KEY = "conversations";
const MAX_CONVERSATIONS = 5;

let conversations = JSON.parse(
  localStorage.getItem(STORAGE_KEY) ?? "[]"
);

let activeConversation = null;

/* ---------------- Storage ---------------- */

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(conversations)
  );
}

export function getConversations() {
  return conversations;
}

export function getActiveConversation() {
  return activeConversation;
}

/* ---------------- Conversations ---------------- */

export async function createNewConversation() {
  if (conversations.length >= MAX_CONVERSATIONS) {
    showToast("Maximum of 5 conversations allowed.");
    return;
  }

  const conversation = await createConversation();

  conversations.unshift({
    id: conversation.id,
    title: conversation.title,
  });

  save();

  await openConversation(conversation.id);
}

export async function openConversation(id) {
  const conversation = conversations.find(
    (c) => c.id === id
  );

  if (!conversation) return;

  activeConversation = conversation;

  renderConversationList(
    conversations,
    activeConversation.id
  );

  setChatTitle(conversation.title);

  clearMessages();

  const messages = await getMessages(id);

  if (messages.length === 0) {
    return;
  }

  messages.forEach((message) =>
    renderMessage(
      message.sender,
      message.content
    )
  );
}

export async function renameConversation(id) {
  const conversation = conversations.find(
    (c) => c.id === id
  );

  if (!conversation) return;

  const title = prompt(
    "Conversation name",
    conversation.title
  );

  if (!title || !title.trim()) {
    return;
  }

  const updated = await updateConversation(
    id,
    title.trim()
  );

  conversation.title = updated.title;

  save();

  renderConversationList(
    conversations,
    activeConversation?.id
  );

  if (activeConversation?.id === id) {
    setChatTitle(updated.title);
  }
}

export async function removeConversation(id) {
  const confirmed = confirm(
    "Delete this conversation?"
  );

  if (!confirmed) return;

  await deleteConversation(id);

  conversations = conversations.filter(
    (c) => c.id !== id
  );

  save();

  if (activeConversation?.id === id) {
    activeConversation = null;

    clearMessages();

    if (conversations.length > 0) {
      await openConversation(
        conversations[0].id
      );
    } else {
      setChatTitle("New Chat");
    }
  }

  renderConversationList(
    conversations,
    activeConversation?.id
  );
}

/* ---------------- Messages ---------------- */

export async function sendCurrentMessage() {
  if (!activeConversation) {
    await createNewConversation();
  }

  const content = getInputValue().trim();

  if (!content) return;

  clearInput();

  removeEmptyState();

  renderMessage("user", content);

  setLoading(true);

  setTyping(true);

  try {
    const response = await sendMessage(
      activeConversation.id,
      content
    );

    renderMessage(
      "assistant",
      response.reply
    );
  } catch (error) {
    showToast(error.message)
  } finally {
    setTyping(false);

    setLoading(false);

    focusInput();
  }
}