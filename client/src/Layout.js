import React, {useState} from "react";
import { useNavigate } from "react-router-dom";



function Layout(){
  const [userName,setUsername]=useState("");
  const[room,setRoom]=useState("");
  const navigate = useNavigate();
  const join_room=()=>{
    if (userName !== "" && room !== "") {
      navigate("/chat",{state:{room:room,name:userName}});
    }
  };
  
  return (<>
   <input type="text" placeholder="room" onChange={(event)=>{setRoom(event.target.value)}}></input>
   <input type="text" placeholder="name" onChange={(event)=>{setUsername(event.target.value)}}></input>
   <button onClick={join_room}>submit</button>
   </>
  );
}
export default Layout