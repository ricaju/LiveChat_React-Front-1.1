import React, {Component}  from 'react';
import './PrivateMessages.css';


class PrivateMessages extends Component {
	render() {
		return (
			<div>
				{this.props.TriggerToggle}
				<p> TU SAM </p>
			</div>
			);
	}



}

export default PrivateMessages;