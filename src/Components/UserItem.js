import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserItem extends Component {
  render() {
    return (
        <tr className="User">
          <td>
            <Link to={`/user/${this.props.user.id}`}>
              {this.props.user.name}
            </Link>
          </td>
          <td>{this.props.user.numberOfPosts}</td>
          <td>{this.props.user.commentsPerPost}</td>
        </tr>
    );
  }
}

export default UserItem;
