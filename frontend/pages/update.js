import React from 'react';
import { useRouter } from 'next/router';

import UpdateItem from '../components/UpdateItem';

const Update = () => {
  const { query } = useRouter();

  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
};

export default Update;
