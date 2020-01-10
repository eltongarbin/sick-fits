import React from 'react';
import { useRouter } from 'next/router';

import Items from '../components/Items';

const Home = () => {
  const { query } = useRouter();

  return (
    <div>
      <Items page={parseInt(query.page) || 1} />
    </div>
  );
};

export default Home;
