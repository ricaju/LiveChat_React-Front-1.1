import React, {Component} from 'react';
import Particles from 'react-particles-js';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class EditProfile extends Component {
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

export default EditProfile;