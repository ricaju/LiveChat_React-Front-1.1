import React, {Component} from 'react';
import './Sidebar.css';
import { Button, ButtonGroup } from 'reactstrap';
import messagesicon from './messagesicon.png';
import sportsicon from './sportsicon.png';
import techicon from './techicon.png';
import travelicon from './travelicon.png';
import logouticon from './logouticon.png';
import '../ChatContainerALL.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {withRouter} from "react-router-dom";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const logoutMutation = gql`
  mutation logout($logged_token: String!) {
    logout(logged_token: $logged_token)
  }
`;

class Sidebar extends Component {
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      editProfile: false,
			logout: false,
			logged_token: JSON.parse(localStorage.getItem('jwt'))
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleEditProfile = () => {
  	this.setState({ editProfile: true }, () => this.props.history.push('/EditProfile'))
  }

	handleLogout = async () => {
		var logout_token = await this.props.mutate( {
			variables: {
				logged_token: this.state.logged_token.data.register || this.state.logged_token.data.login
				}
			}
		)
		localStorage.setItem('jwt', JSON.stringify(logout_token))
  	this.setState({ logout: true }, () => this.props.history.push('/'))
  }

render() {
	return(	
	<>	
	<div className="d-flex justify-content-start" id='cont'>
		<div className="groups">
			<ButtonGroup vertical>
				  <Button className="Buttoni" color="success" onClick={this.props.Hide}>
				  			<img className='imgbuttoni'  alt='messagesicon' src={messagesicon}/>
				  			PRIVATE MESSAGES
				  	</Button>
					<Button className="Buttoni" color="warning"><img className='imgbuttoni' alt='travel' src={travelicon}  onClick={(value) => this.props.ChangingRoom("2")}/>
						TRAVEL
					</Button>
				    <Button className="Buttoni" color="info"><img className='imgbuttoni' alt='sportsicon' src={sportsicon} onClick={(value) => this.props.ChangingRoom("3")}/>
				    	SPORT
				    </Button>
					<Button className="Buttoni" color="danger"><img className='imgbuttoni' alt='techicon' src={techicon}  onClick={(value) => this.props.ChangingRoom("4")}/>
						TECH
					</Button>
					<ButtonDropdown direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="Buttoni" color="primary">
						  <DropdownToggle caret><img className='imgbuttoni' alt='logout' src={logouticon}/>
						    SETTINGS
						  </DropdownToggle>
						  <DropdownMenu>
						    <DropdownItem onClick={this.handleEditProfile} >Edit profile</DropdownItem>
						    <DropdownItem onClick={this.handleLogout}>LOGOUT</DropdownItem>
						  </DropdownMenu>
						</ButtonDropdown>
				</ButtonGroup>
			</div>
	    </div>	
	</>
	);
}
}

export default graphql(logoutMutation)(withRouter(Sidebar));
