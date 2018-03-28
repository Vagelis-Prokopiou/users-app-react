import React, {Component} from 'react';
import UserItem from './UserItem';

class Home extends Component
{
  render()
  {
    let users;
    if (this.props.users)
    {
      users = this.props.users.map((user) =>
      {
        return (
            <UserItem key={user.id} user={user}/>
        );
      });
    }

    return (
        <div className="user">
          <table>
            <thead>
            <tr>
              <td>Name <span onClick={this.props.sortByName}>sort</span></td>
              <td>Posts <span
                  onClick={this.props.sortByCommentsNumber}>sort</span>
              </td>
              <td>Comments/Post <span
                  onClick={this.props.sortByCommentsPerPost}>sort</span></td>
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
