import './App.css';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import moment from 'moment';

// no dotenv
const socket = io.connect('http://localhost:5000');
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    let messageID = nanoid(7);
    socket.emit('chat', {messageID, message, userName });
    setMessage('');
  };

  // function to emit 'markSeen' event
  function markSeen(message) {

    console.log(message);

    let options = {
      messageID: message.messageID
    };

    // Emit 'markSeen' event
    socket.emit('markSeen', options);
  };

  // Handler for 'delivered' event
  socket.on('delivered', (message) => {
    const messageID = message.messageID;

    for (const [index, element] of chat.entries()) {

      if (element.messageID === messageID) {

        element.delivered = true;
        console.log('delivered');
        console.log({ index, element });
      };
    };

    // chat[message.messageID].delivered = true;
    markSeen(message);
  })

  // Handler for 'markedSeen' event
  socket.on('markedSeen', (message) => {
    const messageID = message.messageID;

    for (const [index, element] of chat.entries()) {

      if (element.messageID === messageID) {

        element.seen = true
        console.log('seen');
        console.log({ index, element });
      };
    };

  });

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);

      let options = {
        messageID: payload.messageID,
        timetoken: moment().valueOf()
      };

      // Emit 'received' event
      socket.emit('received', options);
    });
  });


  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>
        {chat.map((payload, index) => {
          return(
            <p key={index}>{payload.message}: <span>id: {payload.userName}</span></p>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }} />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
};

export default App;
