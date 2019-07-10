import React, {Component} from 'react';
import Axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import './Nav.css'
import homeLogo from '../../assets/home_logo.png'
import newLogo from '../../assets/new_logo.png'
import shutDown from '../../assets/shut_down.png'
import noImage from '../../assets/no_image.jpg'

class Nav extends Component {
   constructor(props) {
      super(props);
      this.state = {
         editMode: false,
         userName: ''
      }
      // this.handleLogout = this.handleLogout.bind(this);
      // this.handleInputChange = this.handleInputChange.bind(this);
      // this.handleInputSubmit = this.handleInputSubmit.bind(this);
      // this.updateUserInfo = this.updateUserInfo.bind(this);
   }


  //  componentDidMount() {
  //     this.props.getUser();
  //     console.log(this.props)
  //  }



  //  componentDidUpdate(prevProps) {
  //     if (prevProps.user.username !== this.props.user.username ) alert(`Welcome, ${this.props.user.username}!`);
  //  }
  //  updateUserInfo() {
  //     Axios
  //        .get('/auth/session')
  //        .then(res => this.props.updateUser(res.data.username, res.data.profilePic))
  //        .then(this.setState({ 
  //           username: this.props.username,
  //           editMode: false
  //         }))
  //        .catch(err => console.log(err.request));
  //  }
   handleInputChange(e) {
      const {name, value, id} = e.target;

      if (id === 'editMode') return this.setState({ editMode: true });

      this.setState({ [name]: value })
   }
   handleInputSubmit() {
      Axios
         .put(`/auth/updateusername/${this.state.userName}`)
         .then(() => this.updateUserInfo())
         .catch(err => console.log(err.request));
   }
   handleLogout() {
      Axios
         .post('/auth/logout')
         .then(() => {
            this.props.getUser('');
            this.props.history.push('/');
         })
         .catch(err => console.log(err.request));
   }
   render() {
      return (
         <div className = 'nav-container background'>

               <div className = 'nav-buttons-container'>
       

              
                     {!this.props.user.username ? (
                    <img src={this.props.user.profile} alt="profile pic" id='profile-pic'/>
                     )
                     :
                     (
                      <img src={noImage} alt="no pic" id='asset-logo'/>
                     )}


                    <h6>{this.props.user.username}</h6>
                    <Link to={`/Dashboard/${this.props.user.id}`}>
                    <img src={homeLogo} alt="home" id='asset-logo'/>
                    </Link>

                    <Link to={'/Post'}>
                    <img src={newLogo} alt="new post" id='asset-logo'/>
                    </Link>

                    <div className="logout">
                    <img src={shutDown} alt="logout" id='asset-logo'
                    onClick={() => this.logout()}
                    />
                    </div>
                  
               </div>
            {/* )} */}
         </div>
      );
   }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default withRouter(connect(mapStateToProps, {
  getUser
})(Nav))