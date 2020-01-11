import React from 'react';
import { useRouter } from 'next/router';

import Items from '../components/Items';

const Home = () => {
  const router = useRouter();

  return (
    <div>
      <Items page={parseInt(router?.query.page) || 1} />
    </div>
  );
};

export default Home;
