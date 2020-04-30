/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import * as React from 'react';

interface ThemeProps{
  children: React.ReactNode;
}

const { useReducer, createContext } = React;

export interface InitialState {
  isLight: boolean;
  light: { hex: string; ui: string; bg: string };
  dark: { hex: string; ui: string; bg: string };
  setTheme: boolean;

}

export const initialState: InitialState = {
  isLight: true,
  light: { hex: '#333', ui: '#ddd', bg: '#fff' },
  dark: { hex: '#ddd', ui: '#333', bg: '#333' },
  setTheme: true,
};

export const ThemeContext = createContext<InitialState | any>(initialState);


interface ToggleThemeAction {
  type: 'TOGGLE_THEME';
}


type ActionTypes = ToggleThemeAction

const themeReducer = (state: InitialState, action: ActionTypes) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        setTheme: !state.setTheme,
      };
    default:
      return state;
  }
};


const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
