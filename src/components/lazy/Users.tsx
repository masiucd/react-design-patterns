/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import * as React from 'react';
import UserItem from './UserItem';

interface Props {

}

const Hello: React.FC<Props> = () => {
  const [users, setUsers] = React.useState<Record<string, any>[]>();
  React.useEffect(() => {
    const getData = async (url: string): Promise<void> => {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    };
    getData('https://jsonplaceholder.typicode.com/users');
  }, []);


  return (
    <div className="Users">
      <h2>Users</h2>
      <h4>
        Using
        {' '}
        <span>React Lazy</span>
        {' '}
        and
        {' '}
        <span>React suspense</span>
        {' '}
      </h4>
      {users?.map((user) => <UserItem key={user.id} user={user} />)}
    </div>
  );
};
export default Hello;
