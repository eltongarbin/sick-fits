import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Item from './Item';
import Pagination from './Pagination';

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY);

  if (loading) {
    return (
      <Center>
        <p>Loading...</p>
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <p>Error: {error.message}</p>
      </Center>
    );
  }

  return (
    <Center>
      <Pagination page={page} />
      <ItemsList>
        {data.items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ItemsList>
      <Pagination page={page} />
    </Center>
  );
};

Items.propTypes = {
  page: PropTypes.number.isRequired
};

export default Items;
