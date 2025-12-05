import { useState } from "react";
import { chatbot } from "supersimpledev";
import dayjs from "dayjs";
import loadingspinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    //if user send messgae when isLoading is true then return it
    if (inputText === "" || isLoading) {
      return;
    }

    // Set isLoading to true at the start, and set it to
    // false after everything is done.
    setIsLoading(true);

    //as state does not update imidialy so we kepp it and update it with new messages
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];
    setChatMessages(newChatMessages);

    // We can put this at the top of the function or
    // after the first setChatMessages(). Both work.
    setInputText("");

    // This creates a temporary Loading... message.
    // Because we don't save this message in newChatMessages,
    // it will be remove later, when we add the response.
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-image" src={loadingspinner} />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    //if the response is loading then dont allow to send messages

    //used a thrid party library to get the resposne of the chat bt for our input
    const response = await chatbot.getResponseAsync(inputText);

    //add the resposne of chatbot to the chatMessages array with sender as robot
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    // Set isLoading to false after everything is done.
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([]));
    // OR
    // localStorage.removeItem("Messages");</OR>;

    // However, because chatMessages is being updated, the
    // useEffect in the App component will run, and it will
    // automatically update messages in localStorage to be [].
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder={
          chatMessages.length === 0
            ? "Welcome to the chatbot project ! send a message using the textbox below."
            : undefined
        }
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
