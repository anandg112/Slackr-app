import React, {Component} from 'react';

class Message extends Component {
	render() {
		console.log("Rendering <Message/>");

		switch(this.props.type) {
			case 'incomingNotification':
				return (
					<div className="message system">
						<span className="message-content">{this.props.content}</span>
					</div>
				);
				break;

			case 'incomingMessage':
				return (
					<div className="message">
						<span className="message-username">{this.props.user.username}</span>
						<span className="message-content">{this.props.content}</span>
					</div>
				);
        break;

        default:
         console.log('Unknown message type: ', message.type);
        break;
		}
	}
}

export default Message;
