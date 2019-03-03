import React, {Component} from 'react';
import Particles from 'react-particles-js';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import gql from 'graphql-tag';


class EditProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			newUsername: "",
			password:"",
			newPassword:""
		}
	}

	// napraviti: za valicadiju i ostalo

	handleSubmit = async (e) => {    
    e.preventDefault();
    const check = await this.checkValid();    
    if(!check) {  
    }
    else {
      var token = await this.props.mutate({
        variables: {
          username : this.state.username,
          newUsername : this.state.newUsername,
          password : this.state.password,
          newPassword : this.state.newPassword
        },
      });

      /*if (JSON.stringify(token) === '{"data":{"register":"Username already taken"}}') {
        var usernameValid = 'Username already taken';
        this.setState({ usernameValid })
      }
      else if (JSON.stringify(token) === '{"data":{"register":"Email already exists"}}') {
        var emailValid = 'Email already exists';
        this.setState({ emailValid })
      }
      else {
        localStorage.setItem('jwt', JSON.stringify(token));
        this.props.trigerChat()
      }
    }*/

}}





	render(){
	const particleOptions= {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 1000,
          }
        },
        "color": {
          "value": "random",
        },
      },
    };
		
	return(
		<>
			<Particles className='particles' params={particleOptions} />
			<div className="col-md-8" id='bc-reg'>
            <Form >
                <FormGroup>
                  <Label className= 'white' htmlFor="username">Username</Label>
                  <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="Type your username"
                  onChange = {e => this.handleChange(e)}  />
                  <div style={{color: "red"}}>  </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="email">Email</Label>
                  <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Enter your email"
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}>  </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="password"> Password </Label>
                  <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Enter your password"
                  />
                  <div style={{color: "red"}}> </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="password"> Confirm Password </Label>
                  <Input 
                  type="password" 
                  name="confirmPassword" 
                  id="password1" 
                  placeholder="Confirm your password"
                  />
                  <div style={{color: "red"}}> </div>
                </FormGroup>
                <Button type="submit" 
                  name="submit" 
                  id="button"                   
                  >Submit</Button>
            </Form>

          </div>
		</>
		)
	}

} 

/*const updateUserMutation = gql`
  mutation updateUser($username: String!, $newUsername: String, $password: String!, $newPassword: String, $token: String!) {
    login(username : $username,  newUsername : $newUsername, password : $password, newPassword: $newPassword, token: $token)
  }
`;*/


export default EditProfile;