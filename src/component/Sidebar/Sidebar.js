import React, {Component} from 'react';
import './Sidebar.css';
import { Button, ButtonGroup } from 'reactstrap';
import messagesicon from './messagesicon.png';
import sportsicon from './sportsicon.png';
import techicon from './techicon.png';
import travelicon from './travelicon.png';
import PrivateMessages from './PrivateMessages';
import logouticon from './logouticon.png';
import '../ChatContainerALL.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {PrivateRoute} from '../PrivateRoute';
import EditProfile from '../EditProfile';


class Sidebar extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

	

render() {
	if(this.state.editProfile){
		return(
			<Router>
	          <div>
	            <Redirect to="/EditProfile" />
	            <PrivateRoute path="/EditProfile" exact={true} component={EditProfile} />
	          </div>       
        	</Router>
        )		    		
	}
	else{
	return(
	<div className="d-flex justify-content-start" id='cont'>
		<div className="groups">
			<ButtonGroup vertical>
				  <Button className="Buttoni" color="success" onClick={this.props.Hide}>
				  			<img className='imgbuttoni'  alt='messagesicon' src={messagesicon}/>
				  			PRIVATE MESSAGES
				  	</Button>
					<Button className="Buttoni" color="warning"><img className='imgbuttoni' alt='travel' src={travelicon}/>
						TRAVEL
					</Button>
				    <Button className="Buttoni" color="info"><img className='imgbuttoni' alt='sportsicon' src={sportsicon}/>
				    	SPORT
				    </Button>
					<Button className="Buttoni" color="danger"><img className='imgbuttoni' alt='techicon' src={techicon}/>
						TECH
					</Button>
					<ButtonDropdown direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="Buttoni" color="primary">
						  <DropdownToggle caret><img className='imgbuttoni' alt='logout' src={logouticon}/>
						    SETTINGS
						  </DropdownToggle>
						  <DropdownMenu>
						    <DropdownItem >Edit profile</DropdownItem>
						    <DropdownItem>LOGOUT</DropdownItem>
						  </DropdownMenu>
						</ButtonDropdown>
				</ButtonGroup>
			</div>
	    </div>	
	);
	}
}
}
  

export default Sidebar;