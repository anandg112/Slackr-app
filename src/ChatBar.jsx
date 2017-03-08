import React, {Component} from 'react';

class ChatBar extends Component {
  render(){
    return (
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            onKeyUp = {this.props.currentUser}/>
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onKeyUp = {this.props.message}
            />
        </footer>
      </div>
    )
  }
}

export default ChatBar
