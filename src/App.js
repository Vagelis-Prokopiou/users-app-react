import React, {Component} from 'react';
import Home from './Components/Home';
import User from './Components/User';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ascendingOrder: true, users: [], posts: [], comments: [],
    };

    this.sortByName = this.sortByName.bind(this);
    this.sortByCommentsNumber = this.sortByCommentsNumber.bind(this);
    this.sortByCommentsPerPost = this.sortByCommentsPerPost.bind(this);
  }

  customSort = (property) => {
    const self = this;
    return this.state.users.sort((a, b) => {
      if (typeof a[property] === 'string' && typeof b[property] === 'string') {
        const nameA = a[property].toUpperCase();
        const nameB = b[property].toUpperCase();
        if (nameA < nameB) {
          if (self.state.ascendingOrder) { return -1; }
          return 1;
        }
        if (nameA > nameB) {
          if (self.state.ascendingOrder) { return 1; }
          return -1;
        }
        return 0;
      }

      if (typeof a[property] === 'number' && typeof b[property] === 'number') {
        if (self.state.ascendingOrder) {
          return a[property] - b[property];
        }
        return b[property] - a[property];
      }
    });
  };

  sortByName = () => {
    console.log('sortByName run');
    const sortedUsers = this.customSort('name');
    this.setState({
      users: sortedUsers,
      ascendingOrder: !this.state.ascendingOrder,
    });
  };
  sortByCommentsNumber = () => {
    console.log('sortByCommentsNumber run');
    const sortedUsers = this.customSort('numberOfPosts');
    this.setState({
      users: sortedUsers,
      ascendingOrder: !this.state.ascendingOrder,
    });
  };
  sortByCommentsPerPost = () => {
    console.log('sortByCommentsPerPost run');
    const sortedUsers = this.customSort('commentsPerPost');
    this.setState({
      users: sortedUsers,
      ascendingOrder: !this.state.ascendingOrder,
    });
  };

  componentWillMount() {
    const self = this;

    // Get the posts
    fetch('http://jsonplaceholder.typicode.com/posts').
        then(function(response) { return response.json(); }).
        then(function(posts) {
          self.setState({posts: posts});

          // Get the comments
          fetch('http://jsonplaceholder.typicode.com/comments').
              then(function(response) { return response.json(); }).
              then(function(comments) {
                self.setState({comments: comments});

                // Get the users.
                fetch('http://jsonplaceholder.typicode.com/users').
                    then(function(response) { return response.json(); }).
                    then(function(users) {
                      // Get the posts of each user
                      users.forEach(function(user, index) {
                        const userPosts = self.state.posts.filter(
                            function(post) {
                              return post.userId === user.id;
                            }).map(function(post) {
                          return post.id;
                        });
                        users[index].numberOfPosts = userPosts.length;
                        users[index].postIds = userPosts;
                      });

                      users.forEach(function(user, index) {
                        let commentsTotal = 0;

                        user.postIds.forEach(function(postId) {
                          self.state.comments.forEach(function(comment) {
                            if (comment.postId === postId) {
                              commentsTotal++;
                            }
                          });
                        });

                        users[index].commentsPerPost = commentsTotal /
                            users[index].numberOfPosts;
                      });

                      self.setState({users: users});
                    });
              });
        });
  }

  render() {
    return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" render={() => {
                return <Home
                    users={this.state.users}
                    sortByName={this.sortByName}
                    sortByCommentsNumber={this.sortByCommentsNumber}
                    sortByCommentsPerPost={this.sortByCommentsPerPost}
                />;
              }}/>
              <Route path="/user/:userID" render={({match}) => {
                return <User
                    user={this.state.users.find(user => {
                      return user.id.toString() === match.params.userID;
                    })}
                    posts={this.state.posts.filter(post => {
                      return post.userId.toString() === match.params.userID;
                    })}
                    users={this.state.users}
                />;
              }}/>
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
