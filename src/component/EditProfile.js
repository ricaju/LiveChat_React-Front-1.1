import React, {Component} from 'react';
import gql from 'graphql-tag';

class EditProfile extends Component {
	render(){
		return(
			<div> testt </div>
		)
	}

} 

const updateUserMutation = gql`
  mutation updateUser($username: String!, $newUsername: String, $password: String!, $newPassword: String) {
    login(username : $username,  newUsername : $newUsername, password : $password, newPassword: $newPassword)
  }
`;


export default(updateUserMutation) (EditProfile);