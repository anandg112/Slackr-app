import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: {name: 'Anonymous'},
			userCount: 0,
			messages: []
		}

		this.handleMsg = this.handleMsg.bind(this);
		this.handleUser = this.handleUser.bind(this);
	}

	componentDidMount() {
		this.socket = new WebSocket("ws://localhost:3001");

		this.socket.onopen = (e) => {
			console.log('Connected to server');
		}

		this.socket.onmessage = (e) => {
			let message = JSON.parse(e.data);

			if (message.type === 'updateUserCount') {
				this.setState({userCount: message.userCount});
			} else {
				this.setState({messages: this.state.messages.concat(message)});
			}
		}
	}

	handleMsg(e) {
		if (e.key === 'Enter') {
			let newMessage = {
				type: 'postMessage',
				username: this.state.currentUser.name,
				content: e.target.value
			};

			this.socket.send(JSON.stringify(newMessage));
      e.target.value = '';
		}
	}

	handleUser(e) {
		if (e.key === 'Enter') {
			let newNotification = {
				type: 'postNotification',
				content: `${this.state.currentUser.name} has changed their name to ${e.target.value}.`
			}

			this.setState({currentUser: {name: e.target.value}});

			this.socket.send(JSON.stringify(newNotification));
		}
	}

  render() {
		console.log("Rendering <App/>");
    return (
			<div>
				<nav className='navbar'>
					<a href='/' className='navbar-brand'>Chatty</a>
					<span className='navbar-userCount'>{this.state.userCount} users online</span>
				</nav>
				<MessageList messages={this.state.messages} />
      	<ChatBar username={this.state.currentUser.name} handleMsg={this.handleMsg} handleUser={this.handleUser} />
			</div>
    );
  }
}
export default App;
