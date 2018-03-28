import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class User extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      showUserDetails: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick = () =>
  {
    this.setState({showUserDetails: !this.state.showUserDetails});
  };

  render()
  {
    console.log('this.props.posts', this.props.posts);

    const posts = this.props.posts.map(post =>
    {
      return (
          <div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
      );
    });

    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-8 user">
              <button><Link to="/">Back</Link></button>
              <br/>
              <h1>
                {
                  (this.props.user && this.props.user.name)
                      ? this.props.user.name
                      : 'Loading...'
                }
              </h1>
              <div className='posts'>
                {posts}
              </div>
            </div>

            <div className='col-sm-4 user-details'>
              <button onClick={this.onClick}>User details</button>
              {
                this.state.showUserDetails
                    ? <div>
                      <p>{this.props.user.name}</p>
                      <p>{this.props.user.email}</p>
                      <p>{this.props.user.address.street}</p>
                      <p>{this.props.user.address.suite}</p>
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
