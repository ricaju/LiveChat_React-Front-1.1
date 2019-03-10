import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChatContainer from './ChatContainer';
import SendingMessages from './SendingMessages';
import './ChatContainerALL.css';
import MessageList from './ChatBox';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import main from './main.png';
import sport from './sport.png';
import comp from './comp.png';
import travel from './travel.png';

const validToken = gql`
  mutation validToken($token: String!) {
    validToken(token : $token)
  }
`;

class ChatContainerALL extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
				toggle: true,
				redirect: true,
				chatroomId: "1",
				background: ''
			}
	  }

	/*onChange(chatroomId) {
    if (chatroomId === '1') {
      this.setState({background: 'main'}) // here I want to change the color to red
    } else if (chatroomId === '2'){
    	this.setState({background: 'travel' })
    }
    else if (chatroomId === '3'){
    	this.setState({background: 'sport' })
    }
    else if(chatroomId === '4'){
    	this.setState({background: 'comp' })
   
  }*/
 	


	handleChatRoom = (value) => {
		  this.setState({
			chatroomId: value
		})
		console.log(value)		
	}  

	

	handleToggle = () => {
		if(!this.state.toggle){
			this.setState({
				toggle: true
			})
		}
		else{
			this.setState({
				toggle: false,		
			})
		}
	}

  handleTriger = () => {
    this.setState({ redirect: true }, () => this.props.history.push('/ChatContainerALL'))
  }

  handleResponse = async () => {
  const check_token = localStorage.getItem('jwt')
  if (check_token) {
    const token = JSON.parse(check_token)
    const response = await this.props.mutate({
       variables: {
        token: token.data.register || token.data.login
        }
      });
      if(response.data.validToken === "True"){
          this.handleTriger();
      }
      else {
        this.setState({ redirect: false }, () => this.props.history.push('/HomePage'))
      }
  }
  else {
    this.setState({ redirect: false }, () => this.props.history.push('/HomePage'))
  }
}

  componentWillMount(){     //ili DidMount?
    this.handleResponse();
  }

	render() {
		return(
			<div className="wrapper">
					<div className='rows'>
						<aside className="aside aside-1"><Sidebar ChangingRoom={this.handleChatRoom} Hide={this.handleToggle}/> </aside>
						{/*{this.state.toggle ?
	  					<aside className="aside aside-2" >Toggle private messages
	  							<p>blaglad</p>
	  							<p>blaglad</p>
	  							<p>blaglad</p>
	  							<p>blaglad</p>
	  							<p>blaglad</p>
	  					</aside> : null}*/}
  					</div>
  					<div className='columns'>
	  					<div className="container1">
	  						<MessageList chatroomId = {this.state.chatroomId}/>
						</div>
						<div className='container2'>
							<SendingMessages chatroomId = {this.state.chatroomId}/>
						</div>
					</div>

			</div>
			);
		}
	}

export default graphql(validToken) (ChatContainerALL);