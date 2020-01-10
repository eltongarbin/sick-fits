import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ children, id }) => {
  const [deleteItem, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    update(cache, payload) {
      const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
      data.items = data.items.filter(
        (item) => item.id !== payload.data.deleteItem.id
      );

      cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    }
  });

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem();
    }
  };

  return <button onClick={handleClick}>{children}</button>;
};

DeleteItem.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired
};

export default DeleteItem;
