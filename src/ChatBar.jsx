import React, {Component} from 'react';

class ChatBar extends Component {
	render() {
		console.log("Rendering <ChatBar/>");
		return (
			<footer className='chatbar'>
				<input onKeyUp={this.props.handleUser} className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={this.props.username} />
				<input onKeyUp={this.props.handleMsg} className='chatbar-message' placeholder='Type a message and hit ENTER' />
			</footer>
		);
	}
}

export default ChatBar;
