import { createConversation, deleteConversation, getMessages, sendMessage, updateConversation } from "./api.js";

import {
  clearInput,
  clearMessages,
  focusInput,
  getInputValue,
  removeEmptyState,
  renderEmptyState,
  renderMessage,
  renderSessionsBar,
  renderSkeleton,
  setLoading,
  showToast,
} from "./ui.js";

const STORAGE_KEY = "widget_sessions";

// Normalise: earlier migration stored `label` instead of `title`
let sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  .map((s) => ({ id: s.id, title: s.title ?? s.label ?? "Chat" }));
localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));

let activeId = sessions[0]?.id ?? null;
let loadedSessionId = null;

function saveSessions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getSessions() { return sessions; }
export function getActiveId()  { return activeId; }

export async function initSession() {
  renderSessionsBar(sessions, activeId);

  if (activeId && loadedSessionId === activeId) return;

  if (activeId) {
    clearMessages();
    const messages = await getMessages(activeId).catch(() => null);
    if (messages && messages.length > 0) {
      messages.forEach((m) => renderMessage(m.sender, m.content));
      loadedSessionId = activeId;
      return;
    }
  }

  loadedSessionId = activeId;
  renderEmptyState();
}

export async function openSession(id) {
  if (id === activeId && loadedSessionId === id) return;

  activeId = id;
  clearMessages();
  renderSessionsBar(sessions, activeId);

  const messages = await getMessages(id).catch(() => null);
  if (messages && messages.length > 0) {
    messages.forEach((m) => renderMessage(m.sender, m.content));
  } else {
    renderEmptyState();
  }

  loadedSessionId = activeId;
  focusInput();
}

export async function renameSession(id) {
  const session = sessions.find((s) => s.id === id);
  if (!session) return;

  const title = prompt("Rename conversation", session.title);
  if (!title?.trim()) return;

  const updated = await updateConversation(id, title.trim()).catch(() => null);
  if (!updated) { showToast("Could not rename."); return; }

  session.title = updated.title;
  saveSessions();
  renderSessionsBar(sessions, activeId);
  showToast("Renamed.", "success");
}

export async function removeSession(id) {
  if (!confirm("Delete this conversation?")) return;

  await deleteConversation(id).catch(() => null);

  sessions = sessions.filter((s) => s.id !== id);
  saveSessions();

  if (activeId === id) {
    activeId = sessions[0]?.id ?? null;
    loadedSessionId = null;
    clearMessages();
    if (activeId) {
      await openSession(activeId);
      return;
    }
    renderEmptyState();
  }

  renderSessionsBar(sessions, activeId);
}

export async function startNewSession() {
  activeId        = null;
  loadedSessionId = null;
  clearMessages();
  renderSessionsBar(sessions, activeId);
  renderEmptyState();
  focusInput();
}

export async function sendCurrentMessage(prefilled) {
  const text = (prefilled ?? getInputValue()).trim();
  if (!text) return;

  clearInput();
  removeEmptyState();
  renderMessage("user", text);

  if (!activeId) {
    const conv = await createConversation().catch(() => null);
    if (!conv) {
      showToast("Could not start a session. Please try again.");
      return;
    }
    activeId = conv.id;
    sessions.unshift({ id: activeId, title: conv.title });
    saveSessions();
    loadedSessionId = activeId;
    renderSessionsBar(sessions, activeId);
  }

  const skeleton = renderSkeleton();
  setLoading(true);

  try {
    const response = await sendMessage(activeId, text);
    skeleton.remove();
    renderMessage("assistant", response.reply);
  } catch (err) {
    skeleton.remove();
    showToast(err.message);
  } finally {
    setLoading(false);
    focusInput();
  }
}
