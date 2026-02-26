import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Chat() {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.chat?.message);
  const { loading, error } = useSelector((state) => state.chat);

  const [textInput, setTextInput] = useState();

 const SUGGESTIONS = ["Where is my Order?", "Is my Order Items Returnable?", "How long does Shipping takes?"];

  return (
    <div className="chat-popup">
      <h2>Ask your queries here..</h2>
    </div>
  );
}
