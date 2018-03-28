import React, {Component} from 'react';
import Home from './Components/Home';
import User from './Components/User';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ascendingOrder: true,
      users: [],
      posts: [],
      comments: [],
    };

    this.sortByName = this.sortByName.bind(this);
    this.sortByPostsNumber = this.sortByPostsNumber.bind(this);
    this.sortByCommentsPerPost = this.sortByCommentsPerPost.bind(this);
  }

  customSort = (property) => {
    const self = this;
    return this.state.users.sort((a, b) => {
      if (typeof a[property] === 'string' && typeof b[property] === 'string') {
        const nameA = a[property].toUpperCase();
        const nameB = b[property].toUpperCase();
        if (nameA < nameB) {
          if (self.state.ascendingOrder) {
            return -1;
          }
          return 1;
        }
        if (nameA > nameB) {
          if (self.state.ascendingOrder) {
            return 1;
          }
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
  sortByPostsNumber = () => {
    console.log('sortByPostsNumber run');
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

  getData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    }
    catch (e) {
      console.log('Error!', e);
    }
  };

  componentWillMount() {

    this.getData('http://jsonplaceholder.typicode.com/users').then(data => {
      this.setState({users: data});
      this.getData('http://jsonplaceholder.typicode.com/posts').then(data => {
        this.setState({posts: data});
        this.getData('http://jsonplaceholder.typicode.com/comments').then(data => {
          this.setState({comments: data});

          // Associate posts and comments with users.
          const updatedUsers = [];
          this.state.users.forEach(user => {
            user.posts = this.state.posts.filter(post => {
              return post.userId === user.id;
            });
            user.postIDs = user.posts.map(post => post.id);
            user.comments = this.state.comments.filter(comment => {
              return (user.postIDs.indexOf(comment.postId) > -1);
            });

            updatedUsers.push(user);
            this.setState({users: updatedUsers});
          });
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
                    sortByPostsNumber={this.sortByPostsNumber}
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
                />;
              }}/>
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
