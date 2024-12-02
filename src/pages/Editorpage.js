import React from 'react';

function Editorpage() {
    return (
        <div className="homepagewrapper">
            <div className="formwrapper">
                <img className='homepagelogo' src='/collab-code.png' alt='collab-code logo'/>
                <h4 className='mainLabel'>Paste Your Invitaion room id here</h4>
                <div className='inputgroup'>
                    <input type='text' className='inputbox' placeholder='ROOM-ID'/>
                    <input type='text' className='inputbox' placeholder='USER-NAME'/>
                    <button className='btn joinbtn'>Join</button>
                    <span className='createinfo'>
                        If you dont have an invite then create &nbsp;
                        <a href='' className='createnewbtn'>new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built by <a href='https://github.com/shrikaranks-786/collabcode'>Shrikaran</a></h4>
            </footer>
        </div>
    );
}

export default Editorpage;
