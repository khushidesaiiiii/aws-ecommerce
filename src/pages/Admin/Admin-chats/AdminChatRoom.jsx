import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  loadChat,
  messageReceived,
  sendAdminMessage,
} from "../../../redux/chatSlice";
import { subscribeChat } from "../../../services/chatService";
import Loader from "../../../components/Loader";
import { placeholder } from "./index";
import Button from "../../../UI/Button";

export default function AdminChatRoom() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { message, loading } = useSelector((s) => s.chat);

  const name = message[0]?.name;
  const email = message[0]?.email;
  const avatar = message[0]?.avatar;

  const [text, setText] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;

    return el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  };

  useEffect(() => {
    dispatch(loadChat(userId));

    const sub = subscribeChat((msg) => {
      const nearBottom = isNearBottom();

      dispatch(messageReceived(msg));

      if (!nearBottom) {
        setUnreadCount((c) => c + 1);
      }
    });

    return () => sub.unsubscribe();
  }, [dispatch, userId]);

  useEffect(() => {
    if (isNearBottom()) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      setUnreadCount(0);
    }
  }, [message]);

  const send = () => {
    if (!text.trim()) return;

    dispatch(sendAdminMessage({ userId, message: text }));
    setText("");
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-chat-room">
      <div className="admin-chat-header">
        <h4>
          <img src={avatar || placeholder} alt="user" />
          {name} | {email}
        </h4>
      </div>

      <div className="admin-chat-messages" ref={containerRef}>
        {message.map((m, i) => (
          <div
            key={i}
            className={`admin-chat-bubble ${
              m.sender === "ADMIN" ? "admin" : "user"
            }`}
          >
            <img
              src={m.sender === "USER" ? avatar : placeholder}
              alt="profile"
            />

            <span className="admin-chat-sender">
              {m.sender === "USER" ? name : "Admin"}
            </span>

            <p>{m.message}</p>
            <span className="admin-chat-sender">{m.createdAt}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {unreadCount > 0 && (
        <Button
          className="unread-btn"
          onClick={() => {
            bottomRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            setUnreadCount(0);
          }}
        >
          {unreadCount} new message ↓
        </Button>
      )}

      <div className="admin-chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a reply..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
