/* eslint-disable @typescript-eslint/interface-name-prefix */
import * as React from 'react';


interface IState{
  count: number;
}

interface IAction {
  type: string;
}


const initialState: IState = { count: 0 };

function countReducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
}


const ReducerExample: React.FC = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(countReducer, initialState);
  return (
    <div className="ReducerExample">
      <h1>Count Reducer Example</h1>

      <button type="button" onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <h3>
        Count:
        {' '}
        {state.count}

        {' '}
      </h3>
      <button disabled={state.count === 0} type="button" onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};
export default ReducerExample;
