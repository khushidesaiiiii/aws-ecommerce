import { useEffect, useRef, useState } from "react";
import { BsFillChatTextFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChat,
  messageReceived,
  sendUserMessage,
} from "../../redux/chatSlice";
import { subscribeChat } from "../../services/chatService";
import { placeholder } from "../../pages/Admin/Admin-chats";
import Button from "../../UI/Button";

export default function ChatBot() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showNewMsg, setShowNewMsg] = useState(false);

  const { loading, error, message = [] } = useSelector((state) => state.chat);
  const user = useSelector((s) => s?.auth);
  const userId = user?.user?.id;

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const name = message[0]?.name;
  const avatar = message[0]?.avatar;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(loadChat(userId));
  }, [dispatch]);

  useEffect(() => {
    const sub = subscribeChat((msg) => {
      dispatch(messageReceived(msg));

      const nearBottom = isNearBottom();

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
        return;
      }

      if (!nearBottom) {
        setShowNewMsg(true);
        setUnreadCount((c) => c + 1);
      }
    });

    return () => sub.unsubscribe();
  }, [dispatch, isOpen]);

  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;

    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;

    if (isNearBottom()) {
      scrollToBottom();
      setShowNewMsg(false);
      setUnreadCount(0);
    }
  }, [message, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setShowNewMsg(false);
      setTimeout(scrollToBottom, 50);
    }
  }, [isOpen]);

  const SUGGESTIONS = [
    "Where is my order?",
    "Is my order returnable?",
    "How long does shipping take?",
  ];

  const handleSuggestion = (text) => {
    setTextInput(text);
  };

  const handleSend = () => {
    if (!textInput.trim()) return;

    dispatch(sendUserMessage(textInput));
    setTextInput("");
  };

  const visibleMessages = message.slice(-visibleCount);
  const hasMore = visibleCount < message.length;

  const loadOlder = () => {
    if (hasMore) {
      setVisibleCount((c) => c + 10);
    }
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    if (el.scrollTop === 0 && hasMore) {
      loadOlder();
    }
  };

  return (
    <>
      <div className="chat-float">
        <Button onClick={() => setIsOpen(!isOpen)}>
          <BsFillChatTextFill size={30} />
          {unreadCount > 0 && !isOpen && (
            <span className="cart-count">{unreadCount}</span>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="chat-popup">
          <div className="popup-header">
            <h3>Customer Support</h3>
          </div>

          <div className="chat-section">
            {loading && <p>Loading...</p>}
            {message.length === 0 && (
              <div className="starting-header">
                <p>Hello! How can we help you today?</p>

                <div className="message-suggestions">
                  {SUGGESTIONS.map((msg) => (
                    <Button key={msg} onClick={() => handleSuggestion(msg)}>
                      {msg}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div
              className="user-chats"
              ref={containerRef}
              onScroll={handleScroll}
            >
              {hasMore && (
                <div className="load-older">
                  Scroll up to load older messages
                </div>
              )}
              
              {visibleMessages.map((m, i) => (
                <div
                  key={i}
                  className={`chat-row ${
                    m.sender === "USER" ? "user" : "admin"
                  }`}
                >
                  <div
                    key={i}
                    className={
                      m.sender === "USER"
                        ? "chat-bubble user"
                        : "chat-bubble admin"
                    }
                  >
                    {" "}
                    <div
                      className={
                        m.sender === "USER"
                          ? "chat-bubble-img user"
                          : "chat-bubble-img admin"
                      }
                    >
                      <img
                        src={m.sender === "ADMIN" ? placeholder : avatar}
                        alt="profile"
                      />
                    </div>
                    <span>{m.sender === "ADMIN" ? m.sender : name}</span>
                    {m.message}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
          {showNewMsg && (
            <Button
              className="unread-btn"
              onClick={() => {
                scrollToBottom();
                setShowNewMsg(false);
                setUnreadCount(0);
              }}
            >
              {unreadCount} New Message{unreadCount > 1 ? "s" : ""} ↓
            </Button>
          )}
          <div className="chat-input">
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type a message..."
            />

            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      )}
    </>
  );
}
