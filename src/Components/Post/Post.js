import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import Nav from '../Nav/Nav'
import axios from 'axios'

export class Post extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    // componentDidMount() {
    //     axios
    //         .get('/api/auth/session')
    //         // .then((user) => {
    //         //     this.props.getUser(user.data) 
    //     // })
    // }

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    postMessage = () => {
        let { title, img, content } = this.state
        
        axios
            .post(`/api/post/`, { title, img, content })
            .then(() => {
                alert('your post was successful')
                this.setState({
                    title: '',
                    img: '',
                    content: ''
                })
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Nav />

                <div className='post-dashboard'>
                <div className='post-container'>
              <form>
                <label for="post">Title:</label>
                <input type='text' name='title' 
                onChange={e => this.handleChange(e)}
                />

                <label for="post">Image URL:</label>
                <input type='text' name='img' 
                onChange={e => this.handleChange(e)}
                />

                <label for="post">Content:</label>
                <input type='text' name='content' 
                onChange={e => this.handleChange(e)}
                />

                <button
                onClick={() => this.postMessage()}
                >
                    Post
                </button>

                </form>
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { getUser })(Post)
