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
         newProfilePic: ''
      }
      this.handleInputSubmit = this.handleInputSubmit.bind(this);
   }

   handleChange= (e) => {
      this.setState({ [e.target.name]: e.target.value })
      console.log(this.state.newProfilePic)
  }

   handleInputSubmit(e) {
      e.preventDefault()
      let {newProfilePic} = this.state
      console.log(this.props.user.id)
      console.log(this.state.newProfilePic)
      Axios
         .put(`/api/auth/editProfilePic`, {newProfilePic})
         .then(() => this.editProfilePic())
         .catch(err => console.log(err.request));
   }

   handleLogout() {
      Axios
         .post('/auth/user')
         .then(() => {
            this.props.getUser('');
            this.props.history.push('/');
            console.log(this.user.session)
         })
         .catch(err => console.log(err.request));
   }



   render() {
    console.log(this.props.user.username)
    console.log(this.props.user.id)
    console.log(this.state.newProfilePic)
      return (
         <div className = 'nav-container background'>

               <div className = 'nav-buttons-container'>
       

              
                     {this.props.user.profile ? (
                    <img src={this.props.user.profile} alt="profile pic" id='profile-pic'/>
                     )
                     :
                     (
                      <img src={noImage} alt="no pic" id='asset-logo'/>
                     )}

{/* change profile pic */}
                     <form>
                        <input
                        type='text'
                        defaultValue={this.state.newProfilePic}
                        name='newProfilePic'
                        id={this.props.user.id}
                        onChange={this.handleChange}
                        >
                        </input>

                        <button
                        onClick={this.handleInputSubmit}
                        > 
                           Submit
                        </button>
                     </form>


{/* other stuff */}
                    <h6>{this.props.user.username}</h6>
                    <Link to={`/Dashboard/${this.props.user.id}`}>
                    <img src={homeLogo} alt="home" id='asset-logo'/>
                    </Link>

                    <Link to={'/Post'}>
                    <img src={newLogo} alt="new post" id='asset-logo'/>
                    </Link>

                    <div className="logout">
                    <img src={shutDown} alt="logout" id='asset-logo'
                    onClick={() => this.handleLogout()}
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