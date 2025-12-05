import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import "./app.css";

function App() {
  let messagesFromLocalStorage = JSON.parse(localStorage.getItem("Messages"));

  const [chatMessages, setChatMessages] = useState(
    messagesFromLocalStorage || []
  );

  useEffect(() => {
    Chatbot.addResponses({
      goodbye: "Goodbye. Have a great day!",
      "give me a unique id": function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      },
    });
    console.log("use effect run");
  }, []);

  useEffect(() => {
    localStorage.setItem("Messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-conatiner">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
