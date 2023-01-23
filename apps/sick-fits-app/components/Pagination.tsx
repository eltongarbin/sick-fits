import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import { PaginationStyles } from './Pagination.styles';
import { ErrorMessage } from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    productsCount
  }
`;

type PaginationProps = {
  page: number;
};

export const Pagination = ({ page }: PaginationProps) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return <>Loading...</>;
  if (error) return <ErrorMessage error={error} />;

  const count = data.productsCount;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`} aria-disabled={page <= 1}>
        ← Prev
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`} aria-disabled={page >= pageCount}>
        Next →
      </Link>
    </PaginationStyles>
  );
};
