import * as React from 'react';

interface Props {
  mainTitle: string;
  subTitle?: string;
}

const Title: React.FC<Props> = ({ mainTitle, subTitle }) => (
  <div className="Title">
    {' '}
    <h1>
      {' '}
      {mainTitle}
      {' '}
    </h1>
    {' '}
    <h3>{subTitle}</h3>
    {' '}
  </div>
);
export default Title;
