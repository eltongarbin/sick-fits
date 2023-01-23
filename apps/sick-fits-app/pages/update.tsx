import { useRouter } from 'next/router';

import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage() {
  const { query } = useRouter();

  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
