import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

export default function useCurrentUserQuery(options) {
  return useQuery(CURRENT_USER_QUERY, options);
}
