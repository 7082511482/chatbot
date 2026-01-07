import { useState } from "react";
import knowledge from "../data/knowledge";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const getReply = (text) => {
    const msg = text.toLowerCase();

    for (let item of knowledge) {
      for (let key of item.keywords) {
        if (msg.includes(key)) {
          return item.answer;
        }
      }
    }
    return "Sorry, I don't understand that.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: getReply(input) },
    ]);

    setInput("");
  };

  return (
    <div className="chat-box">
      {messages.map((m, i) => (
        <div key={i} className={m.role}>
          <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
        </div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
