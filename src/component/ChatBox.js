import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './ChatBox.css';


const messageAddedSubscription = gql`
    subscription($chatroomId: String!){
    messageAdded(chatroomId: $chatroomId ) {
      id 
      username
      text
      createdAt
    }
  }
`; 

const messagesQuery = gql` 
  query messages($chatroomId: String!){
  messages(chatroomId: $chatroomId) {
    id
    username
    text
    createdAt
  }
}
`;


const MessageItem = ({ message }) => (
  <li className='listItems'>
    <span className='userName'>{message.username}: </span> +  
    {' '}
     <span className='messages'> {message.text} </span> 
    
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

const MessageList = (chatroomId) => (
  <Query query={messagesQuery} variables={{chatroomId: chatroomId.chatroomId}}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () => subscribeToMore({
        document: messageAddedSubscription,
        variables: {
          chatroomId: chatroomId.chatroomId,
        },
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
