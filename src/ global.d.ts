declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}


type CountFn = () => void

interface User{
  username: string;
  password: string;
}
interface LoginState {
  user: User | null;
  error: string;
  isLoggedIn: boolean;
  isLoading: boolean;
}


interface FormData{
  username: string;
  password: string;
}
