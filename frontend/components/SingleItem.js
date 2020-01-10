import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';

import ErrorMessage from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query singleItemQuery($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <p>Loading....</p>;
  if (!data.item) return <p>No Item Found for {id}</p>;

  const { item } = data;

  return (
    <SingleItemStyles>
      <Head>
        <title>Sick Fits | {item.title}</title>
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </SingleItemStyles>
  );
};

SingleItem.propTypes = {
  id: PropTypes.string.isRequired
};

export default SingleItem;
