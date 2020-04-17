/* eslint-disable react/prop-types */
import * as React from 'react';

interface Props {
  render: Function;
}

const CountUi: React.FC<Props> = ({ render }) => {
  const [count, setcount] = React.useState<number>(0);


  const increase = () => setcount(count + 1);
  const decrease = () => setcount(count - 1);

  return (
    <div className="CountUi">
      {render(count, increase, decrease)}
    </div>
  );
};
export default CountUi;
