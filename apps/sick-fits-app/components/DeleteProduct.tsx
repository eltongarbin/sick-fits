import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactNode } from 'react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
      name
    }
  }
`;

type DeleteProductProps = {
  id: string;
  children: ReactNode;
};

export const DeleteProduct = ({ id, children }: DeleteProductProps) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update(cache, { data: { deleteProduct } }) {
      cache.evict({ id: cache.identify(deleteProduct) });
    },
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
};
