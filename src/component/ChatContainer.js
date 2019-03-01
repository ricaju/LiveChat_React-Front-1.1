import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MessageList from './ChatBox';
import { Container, Row, Col } from 'reactstrap';
import './ChatContainerALL.css';


class ChatContainer extends Component {
	render() {
		//const chatHistory = this.props.AllChatsQuery.chatHistory || []  // storing chat history in "chatHistory" or empty string (if there's no chat)
		return(
			<div className="d-flex" >
				<Container className="text-list " >
					<div>
						<MessageList/>
					 	{/*{chatHistory.map(message => (                          //looping through chatHistory and showing it in ChatBox component
							<ChatBox key={message.id} message={message} />
						))}*/}
					</div>
				</Container>
			</div>



			);
	}
}

export default ChatContainer;   //need to export grapfql querry