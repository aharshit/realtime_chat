import React from "react";
import { useState,useMemo } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
const socket=io.connect("http://localhost:3001");
function Chat(){
    const location = useLocation();
    const[message,setMessage]=useState('')
    const room=location.state.room;
    socket.emit("join_room",room)
    const sendMessage=async()=>{
        await socket.emit("send_message",message,room);
        setMessageList((list) => [...list, message]);
    }
    const [messageList, setMessageList] = useState([]);

    useMemo(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);
    

    return(<>
        <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      {messageList.map((messageContent) => {
            return (
                <p>{messageContent}</p>
            );
          })}
              </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..." onChange={(event)=>{setMessage(event.target.value)}}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      </>
    )
}
export default Chat