import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import chatlogo from './chatlogo.png';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 " options={{ max : 95 }}  >
 				<div className="Tilt-inner"> <img alt='logo' src={chatlogo} style={{ height: 400, width: 400 }} /> </div>
			</Tilt>	
		</div>
	);
}

export default Logo;