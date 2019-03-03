import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './ChatBox.css';


const messageAddedSubscription = gql`
    subscription($chatroomId: String){
    messageAdded(chatroomId: $chatroomId ) {
    	id 
    	username
    	text
    	createdAt
    }
  }
`; 

const messagesQuery = gql` 
	query($chatroomId: String){
	messages(chatroomId: $chatroomId) {
		id
		username
		text
		createdAt

	}
}
`;

//({new Date(message.createdAt).toLocaleString()})

const MessageItem = ({ message }) => (
  <li style={{ borderTop: '1px solid lightgray' }}>
    <p>
      {message.username}: {' '}
      {message.text} {' '}
    </p>
  </li>
);

const MessageListView = class extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
      {data.messages.map(message => <MessageItem key={message.id} message={message} />)}
      </ul>
    );
  }
};

const MessageList = () => (
  <Query query={messagesQuery}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () => subscribeToMore({
        document: messageAddedSubscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            messages: [...prev.messages, subscriptionData.data.messageAdded],
          });
        },
      });
      return <MessageListView data={data} subscribeToMore={more}/>;
    }}
  </Query>
);

export default MessageList;