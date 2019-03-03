import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      newUsername: "",
      password:"",
      newPassword:"",
      back: false,
      usernameValid: "",
      newUsernameValid: "",
      passwordValid: "",
      newPasswordValid: ""
    }
  }

  handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
  };

  checkValid = () => {
  let usernameValid = "";
  let newUsernameValid = "";
  let passwordValid = "";
  let newPasswordValid = "";

  if(!this.state.newUsername) {
      newUsernameValid = "Username can't be empty";
    }
  if(this.state.newPassword.length < 5) {
      newPasswordValid = "Password needs to have more than 5 characters";
    }
  if (usernameValid || newUsernameValid || passwordValid || newPasswordValid) {   
    this.setState({ usernameValid, newUsernameValid, passwordValid, newPasswordValid });
  }
  else {
    this.setState({ usernameValid, newUsernameValid, passwordValid, newPasswordValid });
    return true;
  }
}



  handleSubmit = async (e) => {    
    e.preventDefault();
    const check = await this.checkValid();    
    if(!check) {  
    }
    else {
      const getToken = JSON.parse(localStorage.getItem('jwt'))
      const token1 = getToken.data.login || getToken.data.register

      var token = await this.props.mutate({
        variables: {
          username : this.state.username,
          newUsername : this.state.newUsername,
          password : this.state.password,
          newPassword : this.state.newPassword,
          token: token1
        },
      });

      if (JSON.stringify(token) === '{"data":{"register":"Username already taken"}}') {
        var newUsernameValid = 'Username already taken';
        this.setState({ newUsernameValid })
      }
      else if (JSON.stringify(token) === '{"data":{"register":"Username already taken"}}') {  // provjera za stari password! 
        var passwordValid = "Your old password isn't correct!";
        this.setState({ passwordValid })
    }
      else {
        localStorage.setItem('jwt', JSON.stringify(token));
        this.setState({ back: true }, () => this.props.history.push('/HomePage'))

      }
    }
}

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
            <Form onSubmit={e => this.handleSubmit(e)} >
                <FormGroup>
                  <Label className= 'white' htmlFor="username">Username</Label>
                  <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="Type your username"
                  value={this.state.username}
                  onChange = {e => this.handleChange(e)}  />
                  <div style={{color: "red"}}> {this.state.usernameValid} </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="email">New username</Label>
                  <Input 
                  type="text" 
                  name="newUsername" 
                  id="newUsername" 
                  placeholder="Type your new username"
                  value={this.state.newUsername}
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.newUsernameValid} </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="password"> Password </Label>
                  <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.passwordValid} </div>
                </FormGroup>
                <FormGroup>
                  <Label className= 'white' htmlFor="newPassword"> New password </Label>
                  <Input 
                  type="password" 
                  name="newPassword" 
                  id="password1" 
                  placeholder="Enter your new password"
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.newPasswordValid} </div>
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

const updateUsernameMutation = gql`
  mutation updateUser($username: String!, $newUsername: String,  $token: String!) {
    updateUsername(username : $username,  newUsername : $newUsername,  token: $token)
  }
`;
const updatePasswordMutation = gql`
  mutation updatePassword( $password: String!, $newPassword: String, $token: String!) {
    updatePassword( password : $password, newPassword: $newPassword, token: $token)
  }
`;


export default graphql(updateUsernameMutation,updatePasswordMutation)(withRouter(EditProfile)); 