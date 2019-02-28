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


class Sidebar extends Component {
	

render() {
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
					<Button className="Buttoni" color="primary"><img className='imgbuttoni' alt='logout' src={logouticon}/>
					LOGOUT
					</Button>
				</ButtonGroup>
			</div>
	    </div>	
	);
}
}
  

export default Sidebar;