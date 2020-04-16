import * as React from 'react';

interface Props {
  user: Record<string, any>;
}

const UserItem: React.FC<Props> = ({ user }) => (
  <div className="UserItem">
    <span>{user.name}</span>
    <span>{user.username}</span>
    <span>{user.email}</span>
  </div>
);
export default UserItem;
