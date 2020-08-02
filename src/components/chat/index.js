import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './chattest.scss'
import Chats from '../chats/chats.js'
var cnt = 0;
function ClientComponent(props) {
  // const client = io.connect('https://trader401.herokuapp.com/');
  let{username} = useParams();
  //   const [response, setResponse] = useState('');
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState({});
  const [room ,setRoom] = useState('');
  console.log('cnt',cnt++,chat,room );
  let arrayTest = [];

  

  useEffect( () => {
   
    console.log('useeffect chat',chat);
    props.client.on('connect', () => {
      console.log('before emit',username);
      

      props.client.on('joined', (joinedRoom) => {
        console.log('joinedRoom' ,joinedRoom);
        setRoom(joinedRoom);
      });
    
      //  props. client.on('message', ({ name, message })  => {
      //     setChat([...chat, { name, message }]);
      //   });
      props.client.on('message', (payload)=> {
        console.log('payload>>>>' ,payload);
        // console.log('chat before >>>>' ,chat);[]
        // arrayTest.push(payload);
        // setChat([...chat,payload]);
        // while (msg !== payload) {
        //   setMsg(payload);
        // }
        setMsg(payload);
        // setTimeout(() => {  setMsg(payload);
        //   while (msg !== payload) {

          
        //   } }, 100);
        
        console.log('msg after >>>>' ,msg);
      });
      // props.client.emit('joinRoom',{ token: props.token , secondUser: username });

    });
    //props. client.emit('joinRoom',{ token: props.token , secondUser: username });
  }, [username]);


  useEffect(() => {

    setChat([...chat,msg]);

  }, [msg]);


  useEffect(() => {
    
    props.client.emit('unsubscribe',room);
    props.client.disconnect();
    props.client.connect();
    setChat([]);
    console.log('username changed >>>>',username );
    props.client.emit('joinRoom',{ token: props.token , secondUser: username });
    setChat([]);
  }, [username]);

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { name, message } = state;
    //props. client.emit('message', { name, message });
    props.client.emit('chatMessage', {msg : message , room: room});
    setState({ message: '', name });
  };

  const renderChat = () => {
    console.log('chaaaat   map>>>>>>>>>>>>' , chat);
    // { username, text, time,payload,sender  }
    return chat.map((msg, index) => {
      
      if(msg.username === props.username || msg.sender === props.username){
        return (
<li className="chat-right">
    <div className="chat-hour">08:56 <span className="fa fa-check-circle"></span></div>
    <div className="chat-text">Hi, Russell
        <br/> I need more information about Developer Plan.</div>
    <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
        <div className="chat-name">Sam</div>
    </div>
</li>
        )
      }else{
        return(
<li className="chat-left">
    <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
        <div className="chat-name">Russell</div>
    </div>
    <div className="chat-text">Hello, I'm Russell.
        <br/>How can I help you today?</div>
    <div className="chat-hour">08:55 <span className="fa fa-check-circle"></span></div>
</li>
        )
      }

    });
  };
 

  return (
    <>
  
        <div className="content-wrapper">
        <div className="row gutters">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card m-0">
        <div className="row no-gutters">
<Chats className="here"/>
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div className="selected-user">
                            <span>To: <span className="name">{username}</span></span>
                        </div>
        <div className="chat-container">
        <ul className="chat-box chatContainerScroll">
        {renderChat()}
        </ul>
<div className="form-group mt-3 mb-0">
        <textarea 
        className="form-control" 
        rows="3" 
        placeholder="Type your message here..."
        name="message"
        onChange={e => onTextChange(e)}
        value={state.message}
        >
        </textarea>
        <button onClick={onMessageSubmit}>Send Message</button>
    </div>
      {/* </div> */}
      </div>

    </div>
    </div>
    </div>
    </div>
    </div>
    </div>



    </>
  );
}


const mapStateToProps = (state) =>{
  return {post : state.post,
    token : state.auth.token,
    client: state.auth.client,
    username:state.profile.user.username
  };
} ;
  
const mapDispatchToProps = (dispatch) => ({
//   getRemoteProduct: (id) => dispatch(getRemoteProduct(id) ),
//   addToFav: (id ,token ) => dispatch(addToFav(id ,token)),
//   getPost:(id ,token ) => dispatch(getPost(id ,token)),
});
  
export default connect(mapStateToProps , mapDispatchToProps )( ClientComponent );
      // <div key={index}>
      //   <h3>
      //     {msg.username||msg.sender}: <span>{msg.text||msg.payload }</span>
      //   </h3>
      //   <p>{msg.time||msg.date}</p>
      // </div>
        {/* <div className="selected-user">
    <span>To: <span className="name">{username}</span></span>
</div> */}

{/* <div className="form-group mt-3 mb-0">
        <textarea 
        className="form-control" 
        rows="3" 
        placeholder="Type your message here..."
        name="message"
        onChange={e => onTextChange(e)}
        value={state.message}
        >
        </textarea>
        <button         onChange={e => onTextChange(e)}
        value={state.message}>Send Message</button>
    </div> */}
    {/* <div classNameName="card"> */}
{/* <Chattest/> */}
      {/* <form onSubmit={onMessageSubmit}> */}
        {/* <h1>Messanger</h1> */}
        {/* <div className="selected-user">
                            <span>To: <span className="name">{username}</span></span>
                        </div> */}
        {/* <div classNameName="name-field">
          <label >Name</label>
          <input
            name="name"
            onChange={e => onTextChange(e)}
            value={username}
          />
        </div> */}
   


        {/* <div>
          <label >Message</label>
          <input
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
          />
        </div> */}

        {/* <button>Send Message</button> */}
      {/* </form> */}

      {/* <div classNameName="render-chat"> */}
        {/* <h1>Chat Log</h1> */}