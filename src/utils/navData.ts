/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface INavData {
  id: number;
  text: string;
  path: string;
}


export const navData: INavData[] = [
  {
    id: 1,
    text: 'home',
    path: '/',
  },
  {
    id: 2,
    text: 'lazyLoading',
    path: '/lazy',
  },
  {
    id: 3,
    text: 'render props',
    path: '/renderprops',
  },
  {
    id: 4,
    text: 'useMemo',
    path: '/usememo',
  },
  {
    id: 5,
    text: 'useCallback',
    path: '/usecallback',
  },
  {
    id: 6,
    text: 'useReducer',
    path: '/usereducer',
  },
  {
    id: 7,
    text: 'useReducerTwo',
    path: '/usereducertwo',
  },
];
