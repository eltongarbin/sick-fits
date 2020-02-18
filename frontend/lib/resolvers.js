import gql from 'graphql-tag';

import { LOCAL_STATE_QUERY } from '../components/Cart';

export const typeDefs = gql`
  extend type Query {
    cartOpen: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    toggleCart(_, _variables, { cache }) {
      const { cartOpen } = cache.readQuery({
        query: LOCAL_STATE_QUERY
      });
      const data = {
        data: { cartOpen: !cartOpen }
      };

      cache.writeData(data);

      return data;
    }
  }
};
