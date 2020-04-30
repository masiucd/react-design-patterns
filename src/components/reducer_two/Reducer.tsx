/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import * as React from 'react';
import UserProfile from './UserProfile';
import { ThemeContext } from '../../context/Theme';

const { useReducer, useState } = React;


const initialState: LoginState = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error: '',
};

interface LoginAction {
  type: 'LOGIN';
  payload: User;
}

interface LogoutAction {
  type: 'LOGOUT';
}
interface ErrorAction {
  type: 'ERROR';
  payload: string;
}
interface ClearErrorAction {
  type: 'CLEAR_ERROR';

}

export type LoginActionType = LoginAction | LogoutAction | ErrorAction | ClearErrorAction


function formReducer(state: LoginState, action: LoginActionType) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
}


interface Props {

}


const ReducerTwo: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { state: themeState } = React.useContext(ThemeContext);
  const { user, isLoggedIn, error } = state;
  const [formData, setformData] = useState<User>({
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setformData({ ...formData, [name]: value });
  };

  const { username, password } = formData;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loggedInUser = { username, password };

    if (!username || !password) {
      dispatch({
        type: 'ERROR',
        payload: 'password and email is required!!!',
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR' });
      }, 5000);
    } else if (username.length < 5 || password.length < 5) {
      dispatch({
        type: 'ERROR',
        payload: 'please fill in a longer password and username',
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR' });
      }, 5000);
    }

    if (username.length > 5 && password.length > 5) {
      dispatch({
        type: 'LOGIN',
        payload: loggedInUser,
      });
      setformData({
        username: '',
        password: '',
      });
    }
  };


  const theme = themeState.setTheme ? themeState.light : themeState.dark;

  return (
    <>
      {!isLoggedIn ? (
        <>
          <h2 id="Login" style={{ color: theme.hex }}>Login</h2>
          <div className="ErrorBox">
            <h3>{error && error}</h3>
          </div>
          <form onSubmit={handleSubmit} className="Form">
            <div className="form-group">
              <label htmlFor="username">
                <span style={{ color: theme.hex }}>Username</span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  placeholder="username"
                  value={username}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <span style={{ color: theme.hex }}>password</span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="password"
                  placeholder="password"
                  value={password}
                />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      ) : <UserProfile user={user} dispatch={dispatch} /> }

    </>
  );
};
export default ReducerTwo;
