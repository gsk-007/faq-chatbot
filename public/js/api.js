const API_BASE = "/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

/* ---------------- Conversations ---------------- */

export async function createConversation() {
  return request("/conversations", {
    method: "POST",
  });
}

export async function getConversation(id) {
  return request(`/conversations/${id}`);
}

export async function updateConversation(id, title) {
  return request(`/conversations/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
}

export async function deleteConversation(id) {
  return request(`/conversations/${id}`, {
    method: "DELETE",
  });
}

/* ---------------- Messages ---------------- */

export async function getMessages(conversationId) {
  return request(`/conversations/${conversationId}/messages`);
}

export async function sendMessage(conversationId, content) {
  return request(`/conversations/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content,
    }),
  });
}