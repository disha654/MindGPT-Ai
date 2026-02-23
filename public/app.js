const chatLog = document.getElementById("chatLog");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const modelPill = document.getElementById("modelPill");

const messages = [
  {
    role: "system",
    content: "You are a helpful AI assistant."
  }
];

function appendMessage(role, content) {
  const el = document.createElement("article");
  el.className = `message ${role}`;
  el.textContent = content;
  chatLog.appendChild(el);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function setLoading(isLoading, text = "") {
  sendBtn.disabled = isLoading;
  promptInput.disabled = isLoading;
  statusEl.textContent = text || (isLoading ? "Thinking..." : "Ready");
}

async function sendMessage(userText) {
  messages.push({ role: "user", content: userText });
  appendMessage("user", userText);

  setLoading(true, "Generating response...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        maxTokens: 512,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    const reply = data.reply || "No response from model.";
    messages.push({ role: "assistant", content: reply });
    appendMessage("assistant", reply);

    if (data.model) {
      modelPill.textContent = data.model;
    }

    setLoading(false);
  } catch (err) {
    appendMessage("assistant", `Error: ${err.message}`);
    setLoading(false, "Error while generating response");
  }
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userText = promptInput.value.trim();
  if (!userText) return;

  promptInput.value = "";
  await sendMessage(userText);
});

promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    if (!sendBtn.disabled) {
      sendBtn.click();
    }
  }
});

appendMessage("assistant", "Hello! I am MindGPT powered by Llama 3.1 8B Instruct. How can I help?");
