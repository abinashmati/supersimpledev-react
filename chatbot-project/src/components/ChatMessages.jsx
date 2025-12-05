import ChatMessage from "./ChatMessage";
import useAutoScroll from "./hooks/AutoScroll";
import "./ChatMessages.css";

export function ChatMessages({ chatMessages }) {
  //As we want add auto scroll when a message is added so it will move youto down to the latest message
  // then we can useEffect hook as it is the best scenario that it will run after a component is updated
  //react will run the fucntion that useEffect hook takes after component is scraeted and every time the component is updated

  /*Code moved to useAutoScroll custom hook
        const chatMessagesRef = React.useRef(null);
        //react will store the html element who has the ref with the ref prop chatMessagesRef

        React.useEffect(() => {
          const containerElem = chatMessagesRef.current;
          if (containerElem) {
            //It means how much we want to scroll from top then as we passed scroll height so it will take the total scroll height of the page to top so it will take you to the bottom.
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        }, [chatMessages]);*/

  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}
