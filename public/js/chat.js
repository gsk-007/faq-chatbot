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
    alert("Maximum of 5 conversations allowed.");
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

export async function renameConversation(title) {
  if (!activeConversation) return;

  const updated = await updateConversation(
    activeConversation.id,
    title
  );

  activeConversation.title = updated.title;

  save();

  renderConversationList(
    conversations,
    activeConversation.id
  );

  setChatTitle(updated.title);
}

export async function removeConversation(id) {
  await deleteConversation(id);

  conversations = conversations.filter(
    (c) => c.id !== id
  );

  save();

  activeConversation = null;

  renderConversationList(conversations);

  clearMessages();

  setChatTitle("New Chat");
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
    console.log(response)
    renderMessage(
      "assistant",
      response.reply
    );
  } catch (error) {
    renderMessage(
      "assistant",
      `⚠️ ${error.message}`
    );
  } finally {
    setTyping(false);

    setLoading(false);

    focusInput();
  }
}