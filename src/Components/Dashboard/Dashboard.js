import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import axios from 'axios'
import Nav from '../Nav/Nav'
import search_logo from '../../assets/search_logo.png'
import './Dashboard.css'

class Dashboard extends Component {  
    
    constructor() {
      super();

      this.state = {
        search: '',
        searchResults: '',
        messages: [],
        user: []
      

      };
    }

    componentDidMount(){
        // this.props.getUser()
        this.updateUser()

        axios
        .get('/api/messages')
          .then(res => this.setState({
            messages : res.data
          }))
    }




    componentDidUpdate(prevProps) {
      // console.log(this.props.username)
 
       if (prevProps.username !== this.props.username ) alert(`Welcome, ${this.props.user.username}!`);
      }




    updateUser(user){
        this.setState({user:user})
      }  
    handleChange= (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }

    searchTitle(){
      axios.get(`/api/buys/title/${this.state.search}`)
          .then(res => this.setState({searchResults: res.data }))
  }



    getMessages = () => {
      axios
          .get('/api/messages')
          .then(response => {
              this.setState({ messages: response.data })
          })
    }





    render() {
        // console.log(this.props.user)
        console.log(this.state.search)
      let { search, messages } = this.state
      let displayMessages = messages.map(message => {
          return (          
              <div className='message-map' key={message.id}>
                  <div className='title'>
                      <h2>{message.title}</h2>
                  </div>
                  <div className="info">
                      <h5>{message.username}</h5>

                      <img className = 'message-map-img' src={message.img} alt="post"/>
                  </div>
              </div>
          )
      })
      return (
          <div>

          <Nav />
              <div className="dashboard-container">
              <div className='search-bar-container'>

 {/*  search  */}
              <form className='search'>
                  <input type='text' name='search' value={search}
                  onChange={e => this.handleChange(e)}
                  />
                  <button
                  onClick={()=> {
                    console.log(this.state.search)
                    this.searchTitle(this.state.search)}}
                  >
                      <img src= {search_logo} alt="Search"/>
                  </button>
                  <button>
                      Reset
                  </button>
              </form>
              <div className='my-post-check'>
                  <h6>My Posts</h6>{'  '}
                  <input type='checkbox'/>
              </div>


              </div>


            <div className = 'messages-container'>
              <div className='messages'>
                  {displayMessages}
              </div>
            </div>
              
          </div>
          </div>
      )
  }
}

const mapStateToProps = state =>{
  // console.log(state);
  return{
      user: state.user
  }
}

export default (connect(mapStateToProps, {getUser})(Dashboard))