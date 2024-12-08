import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { Navigate, useLocation , useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function Editorpage() {

    const socketref = useRef(null);
    const location = useLocation();
    const reactnavigator = useNavigate();
    const {roomId} = useParams();
    const [clients,setclients] = useState([]);


    useEffect(()=>{
        const init = async ()=>{
            socketref.current = await initSocket();
            socketref.current.on("connect_error",(err)=> handleerrors(err));
            socketref.current.on("connect_failed",(err)=> handleerrors(err));

            function handleerrors(e){
                console.log("socket error",e);
                toast.error("socket connection failed, try again later");
                reactnavigator("/")
            }

            socketref.current.emit(ACTIONS.JOIN,{
                roomId,
                username : location.state?.username,
            })

            //listining for joined events
            socketref.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
                if(username!==location.state.username){
                    toast.success(`${username} joined the room.`);
                    console.log(`${username} joined`)
                }
                setclients(clients);
            })
        }
        init();
    },[])

    if(!location.state){
        <Navigate to="/"/>
    }

    return (
        <div className='mainwrap'>
            <div className='aside'>
                <div className='asideinner'>
                    <h3>Users In Room </h3>
                    <div className='clientslist'>
                        {clients.map((client) => (
                            <Client username={client.username} key={client.socketid} />
                        ))}
                    </div>
                </div>
                <button className='btn copybtn'>Copy Room-Id</button>
                <button className='btn leavebtn'>leave</button>
            </div>
            <div className='editorwrap'>
                <Editor/>
            </div>
        </div>
    );
}

export default Editorpage;
