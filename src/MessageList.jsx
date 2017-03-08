import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    //console.log(this.props, "this is");
    const messages = this.props.messages.map( (message, index) => {
      return <Message username={message.username} content={message.content} key={index} />
    })

    return (
    <div className="messages">
      {messages}
    </div>
    )
  }
}

export default MessageList;
