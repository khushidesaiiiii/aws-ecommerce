import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAllChat } from "../../../redux/chatSlice";
import Loader from "../../../components/Loader";

export const placeholder =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AdminChats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAllChat());
  }, [dispatch]);

  //   const handleUserProfile = (userId) => {

  //   };
  const handleNavigate = (userId) => {
    navigate(`/admin/chat/${userId}`);
  };

  const chats = useSelector((state) => state.chat?.chats);
  // console.log(chats[0]);


  const users = [...new Map(chats.map((c) => [c.userId, c])).values()];

  const { loading, error } = useSelector((state) => state.chat);

  if (loading) return <Loader />;

  return (
    <div className="admin-chats-page">
      <h2> All Conversations</h2>
      {users.length === 0 && <p>No conversations found.</p>}
      <div className="chat-cards">
        {users.map((c) => (
          //console.log(c.userId);
          <div key={c.userId} onClick={() => handleNavigate(c.userId)}>
            <img src={placeholder} alt="user" />
          
            <h6>{c.userId}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
