import React, { Component } from 'react';
import './Auth.css'
import heloLogo from '../../assets/helo_logo.png'
import DashBoard from '../Dashboard/Dashboard'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'

class Auth extends Component {  
    
    constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
        user: [], 
        // redirect: false
      };
    }
    

    componentDidMount() {
      axios
          .get('/auth/session')
          .then((user) => {
              this.props.getUser(user.data) 
      })
  }

  //uncomment
   // componentDidMount(){
    // updateUser(user){
    //     this.setState({user:user})
    //   }  

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // loginUser = () => {
    //     let { username, password }= this.state
    //     axios
    //         .post('/api/auth/login', { username, password })
    //         .then(user => {
    //             this.props.getUser(user.data) 
    //             this.setState({
    //                 username: '',
    //                 password: ''
    //             })
    //         })
    //         .catch(() => alert('Incorrect username or password'));
    // }

    loginUser(e){
        e.preventDefault()
        let {username, password} = this.state;
        axios
            .post('/auth/login', {username, password})
            .then(user=>{
                    console.log(user.data)
                this.props.getUser(user.data)
                    console.log(user)
                //     console.log(username)
                //     console.log(password)
                this.setState({
                    username: '', 
                    password: '', 
                    // redirect: true
                  });
            })
            .catch((err)=>{
                this.setState({username: '', password: ''});
                console.log(err, 'Login failed in Auth component');
            })
    }


    render() {
        console.log(this.props)
        console.log(this.props.user)
        // console.log(this.props.user.username)
        // console.log(this.state)
      

        return (
         !this.props.user.username ? (

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
                    onClick={(e) => this.loginUser(e)}
                    >Login</button>

                    <button className = 'auth-buttons'>Register in postman</button>
                </div>
            </form>

              </div>
        
          </div>
        
         ) 
         :
         (
             <DashBoard/>
         )
        )
      }  
    }



    // Login.propTypes = {
    //     classes: PropTypes.object.isRequired,
    //   }
    
    
      const mapStateToProps = state =>{
        // console.log(state);
        return{
            user: state.user
        }
    }




  //   function mapStateToProps(state) {
  //     const { user } = state
  //     return { user }
  // }
    export default connect(mapStateToProps, {getUser})(Auth)