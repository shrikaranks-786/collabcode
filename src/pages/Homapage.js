import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from "uuid"

function Homapage() {
    const [rooid,setroomid] =  useState("");
    const [username,setusername] = useState("");
    const navigate = useNavigate();

    const createnewroom = (e)=>{
        e.preventDefault();
        const id = uuidv4();
        setroomid(id);
        toast.success("Created a new room");
    }

    const joinroom = ()=>{
        if(!rooid || !username){
            toast.error("Room-id and user-name is required");
            return;
        }
        navigate(`/editor/${rooid}`,{
            state : {
                username ,
            }
        });
    }

    return (
        <div className="homepagewrapper">
            <div className="formwrapper">
                <img className='homepagelogo' src='/collab-code.png' alt='collab-code logo'/>
                <h4 className='mainLabel'>Paste Your Invitaion room id here</h4>
                <div className='inputgroup'>
                    <input type='text' className='inputbox' placeholder='ROOM-ID' onChange={(e)=>setroomid(e.target.value)} value={rooid}/>
                    <input type='text' className='inputbox' placeholder='USER-NAME' onChange={(e)=>setusername(e.target.value)} value={username}/>
                    <button onClick={joinroom} className='btn joinbtn'>Join</button>
                    <span className='createinfo'>
                        If you dont have an invite then create &nbsp;
                        <a onClick={createnewroom} href='' className='createnewbtn'>new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built by <a href='https://github.com/shrikaranks-786/collabcode'>Shrikaran</a></h4>
            </footer>
        </div>
    );
}

export default Homapage