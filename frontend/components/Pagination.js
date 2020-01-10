import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <p>Loading....</p>;

  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits! - Page {page} of {pages}
        </title>
      </Head>
      <Link
        prefetch
        href={{
          pathname: 'items',
          query: {
            page: page - 1
          }
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ◀️ Prev
        </a>
      </Link>
      <p>
        Page {page} of {pages}!
      </p>
      <p>{count} Items Total</p>
      <Link
        prefetch
        href={{
          pathname: 'items',
          query: {
            page: page + 1
          }
        }}
      >
        <a className="prev" aria-disabled={page >= pages}>
          Next ▶️
        </a>
      </Link>
    </PaginationStyles>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired
};

export default Pagination;
