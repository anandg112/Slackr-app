import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		console.log("Rendering <MessageList/>");

		let messages = this.props.messages.map((message) => {
			return <Message key={message.id} type={message.type} user={message.user} content={message.content} />;
		});

		return(
			<main className='messages'>
				{messages}
			</main>
		)
	}
}

export default MessageList;
