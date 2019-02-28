import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Particles from 'react-particles-js';
import Login from '../component/Login';
import Registration from '../component/Registration';
import ChatContainerALL from '../component/ChatContainerALL';
import {PrivateRoute} from '../component/PrivateRoute';
import './App.css';
import Logo from '../component/Logo/Logo.js';
import { Container, Row, Col, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { HttpLink } from "apollo-link-http";
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context';


const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true
  }
})

const link = split(
  ({query}) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)


const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})


const particleOptions= {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 1000
          }
        },
        "color": {
          "value": "random"
        }
      }
    }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      registration: false,
      redirect: false,
    }
  }

  handeLog = () => {
    this.setState({
      login: true,
      registration: false
    });
  }
  handleReg = () => {
    this.setState({
      login: false,
      registration: true
    })
  }

  handleTriger = () => {
  this.setState({
    redirect: true
  })

    const WSClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
      reconnect: true,
      connectionParams: {
      }
    });

    const GraphQLClient = new ApolloClient({
      link: WSClient,
      cache: new InMemoryCache()
    });
  }

  render() {
    if(this.state.redirect){
      return(
        <ApolloProvider client={client}>
        <Router>
          <div>
            <Redirect to="/ChatContainerALL" />
            <PrivateRoute path="/ChatContainerALL" exact={true} component={ChatContainerALL} />
          </div>       
        </Router>
      </ApolloProvider>)
    }
    else {
      return(
        <div>
        <ApolloProvider client={client}>
        <Particles className='particles' params={particleOptions} />
            <Container>
              <Row>
                <Col xs="6" className='left'>  <Logo /> </Col>
                <Col xs="6" >
                <Row className="red">
                <Button id='login' onClick={this.handeLog}>Login</Button>
                <Button id='registration' onClick={this.handleReg}>Registration</Button>
                  {this.state.login ? <Login trigerChat={this.handleTriger} /> : null}
                  {this.state.registration ? <Registration trigerChat={this.handleTriger} /> : null}
                  </Row>
                </Col>
              </Row>
            </Container>
          }
          </ApolloProvider>
        </div>
        );
      }
    }
  }

export default App;
