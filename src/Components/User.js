import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserDetails: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    this.setState({showUserDetails: !this.state.showUserDetails});
  };

  render() {
    let posts = [];
    if (this.props.user && this.props.user.posts) {
      posts = this.props.user.posts.map(post => {
        return (
            <div className="post" key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
        );
      });
    }

    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-8 user">
              <div>
                <button><Link to="/">Home</Link></button>
                <br/><br/>
              </div>
              <h1>
                {
                  (this.props.user && this.props.user.name)
                      ? this.props.user.name
                      : 'Loading...'
                }
              </h1>
              <div className='posts'>
                {
                  posts.length > 0 ? posts : 'Loading posts...'
                }
              </div>
            </div>

            <div className='col-sm-4 user-details'>
              <button onClick={this.onClick}>User details</button>
              {
                this.state.showUserDetails
                    ? <div>
                      <p>Name: {this.props.user.name}</p>
                      <p>Email: {this.props.user.email}</p>
                      <p>Street: {this.props.user.address.street}</p>
                      <p>Number: {this.props.user.address.suite}</p>
                    </div>
                    : null
              }
            </div>
          </div>
        </div>
    );
  }
}

export default User;
