import React, { Component } from 'react';
import './Auth.css'
import heloLogo from '../../assets/helo_logo.png'
import DashBoard from '../Dashboard/Dashboard'
import axios from 'axios'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../../ducks/reducer'

export default class Auth extends Component {  
    
    constructor() {
      super();

      this.state = {
        username: "",
        password: ""
      };
    }
    

    componentDidMount() {
        axios
            .get('/api/auth/user')
            .then((user) => {
                this.props.getUser(user.data) 
        })
    }


    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    logInUser = () => {
        let { username, password }= this.state
        axios
            .post('/api/auth/login', { username, password })
            .then(user => {
                this.props.getUser(user.data) 
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(() => alert('Incorrect username or password'));
    }




    render() {
        console.log(this.props)
        // let { id } = this.props.user

        return (
        // !id ? (

          <div className= 'auth-container background'>
              <div className= 'auth-form-container background'>

                  {/* <div className= 'emoji'>
                  
                  </div> */}

                  {/* <h1 className = 'helo-text'> */}
                  <img src={heloLogo} alt="helo logo"/>

                    Helo
                  {/* </h1> */}

                <form>
                  <div className = 'auth-form'>
                    <div className = 'auth-text'>Username: &nbsp; </div>
                    <input type="text" 
                           name="username" 
                           placeholder="Username" 
                           onChange={e => this.handleChange(e)}
                    />       
                  </div>

                  <div className = 'auth-form'>
                  <div className = 'auth-text'>Password: &nbsp; </div>
                    <input type="text" 
                           name="password" 
                           placeholder="Password" 
                           onChange={e => this.handleChange(e)}
                    />      
                  </div>

                  <div className = 'auth-buttons-container'>
                    <button className = 'auth-buttons'
                    onClick={() => this.logInUser()}
                    >Login</button>

                    <button className = 'auth-buttons'>Register</button>
                </div>
            </form>

              </div>
        
          </div>
        
        // ) 
        // :
        // (
        //     <DashBoard/>
        // )
        )
      }  
    }
