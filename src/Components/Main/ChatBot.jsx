import { useState } from "react";
// import './App.css'
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { Button } from "@material-tailwind/react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
// import dotenv
// require('dotenv').config();
import env from "react-dotenv";
const API_KEY = process.env.REACT_APP_API_KEY;

// "Explain things like you would to a person who doesn't know much"
const systemMessage = {
  //  Explain things like you are an extremely experienced environment and life on land expert
  role: "system",
  content:
    "Explain things like you are an extremely experienced environment and life on land expert.",
};

const Chatbot = ({ onClose }) => {
  const isBackgroundGreen = true;
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Your Life on Land Expert! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatbot to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatbot
        ...apiMessages, // The messages from our chat with Chatbot
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }
  // Add your chatbot component code here
  return (
    <div>
      {/* Translucent overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={onClose}
      ></div>

      {/* Chatbot container */}
      <div className="fixed bottom-0 right-0 p-4 bg-white shadow-lg z-50">
        {/* Your chatbot UI goes here */}
        <div className="chatbotapp">
          <div
            style={{
              backgroundColor: isBackgroundGreen ? "lightgreen" : "blue",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2
                style={{
                  padding: "10px 20px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Life on Land Expert
              </h2>
              <div
                style={{
                  position: "relative",
                  textAlign: "left",
                  height: "650px",
                  width: "600px",
                }}
              >
                <MainContainer>
                  <ChatContainer>
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={
                        isTyping ? (
                          <TypingIndicator content="Expert is typing" />
                        ) : null
                      }
                    >
                      {messages.map((message, i) => {
                        console.log(message);
                        return <Message key={i} model={message} />;
                      })}
                    </MessageList>
                    <MessageInput
                      placeholder="Type message here"
                      onSend={handleSend}
                    />
                  </ChatContainer>
                </MainContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Add a close button using the imported Button component */}
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default Chatbot;
