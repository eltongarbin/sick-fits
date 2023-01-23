import { useRouter } from 'next/router';

import { SingleProduct } from '../../components/SingleProduct';

export default function SingleProductPage() {
  const { query } = useRouter();
  return <SingleProduct id={query.id!.toString()} />;
}
