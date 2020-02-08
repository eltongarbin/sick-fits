import React from 'react';
import { useRouter } from 'next/router';

import Reset from '../components/Reset';

const ResetPage = () => {
  const router = useRouter();
  const resetToken = router?.query.resetToken;

  return <div>{resetToken && <Reset resetToken={resetToken} />}</div>;
};

export default ResetPage;
