import React, { useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';

function Editorpage() {
    const [clients, setclients] = useState([
        { socketid: 1, username: "karan" },
        { socketid: 2, username: "vig" }
    ]);

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
