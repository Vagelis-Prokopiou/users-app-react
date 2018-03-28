import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const UserItem = props => (
    <tr className="User">
      <td>
        <Link to={`/user/${props.user.id}`}>
          {props.user.name}
        </Link>
      </td>
      <td>{props.user.numberOfPosts}</td>
      <td>{props.user.commentsPerPost}</td>
    </tr>
);

export default UserItem;
