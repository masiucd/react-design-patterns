import * as React from 'react';
import { LoginActionType } from './Reducer';

interface Props {
  user: User | null;
  dispatch: React.Dispatch<LoginActionType>;
}

const UserProfile: React.FC<Props> = ({ user, dispatch }) => (
  <div>
    {' '}
    <h1>
      {' '}
      Welcome
      {' '}
      {user?.username}
      {' '}
    </h1>

    <button
      type="button"
      onClick={() => {
        dispatch({
          type: 'LOGOUT',
        });
      }}
    >
      Logout

    </button>
    {' '}
  </div>
);
export default UserProfile;
