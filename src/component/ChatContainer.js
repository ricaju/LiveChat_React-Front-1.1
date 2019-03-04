import React, { Component } from 'react';
import MessageList from './ChatBox';
import { Container } from 'reactstrap';


class ChatContainer extends Component {
	render() {
		return(
			<div className="d-flex">
				<Container className=" p-3" >
					<div>
						<MessageList/>
					</div>
					</Container>
				</div>
			);
	}
}

export default ChatContainer;   //need to export grapfql querry