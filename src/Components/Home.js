import React, {Component} from 'react';
import UserItem from './UserItem';
import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp';

class Home extends Component {
  state = {
    ascendingOrder: false,
  };

  sortByName = () => {
    this.props.sortByName();
    this.setState({ascendingOrder: !this.state.ascendingOrder});
  };

  sortByPostsNumber = () => {
    this.props.sortByPostsNumber();
    this.setState({ascendingOrder: !this.state.ascendingOrder});
  };
  sortByCommentsPerPost = () => {
    this.props.sortByCommentsPerPost();
    this.setState({ascendingOrder: !this.state.ascendingOrder});
  };

  render() {
    let users;
    if (this.props.users) {
      users = this.props.users.map((user) => {
        return (
            <UserItem key={user.id} user={user}/>
        );
      });
    }

    return (
        <div className="user">
          <h1>Users</h1>
          <table className="table table-striped">
            <thead>
            <tr>
              <td>Name <span onClick={this.sortByName}>
                {
                  this.state.ascendingOrder
                      ? <ArrowDown/>
                      : <ArrowUp/>
                }
              </span></td>
              <td>Posts <span onClick={this.sortByPostsNumber}>
                {
                  this.state.ascendingOrder
                      ? <ArrowDown/>
                      : <ArrowUp/>
                }
              </span></td>
              <td>Comments/Post <span onClick={this.sortByCommentsPerPost}>
                {
                  this.state.ascendingOrder
                      ? <ArrowDown/>
                      : <ArrowUp/>
                }
              </span></td>
            </tr>
            </thead>
            <tbody>
            {users ? users : 'Loading...'}
            </tbody>
          </table>
        </div>
    );
  }
}

export default Home;
