import * as React from 'react';
import Title from '../components/layout/title/Title';

interface Props {

}

const Home: React.FC<Props> = () => (
  <div className="Container">
    <Title mainTitle="Welcome" subTitle="React Cool concepts" />
  </div>
);
export default Home;
