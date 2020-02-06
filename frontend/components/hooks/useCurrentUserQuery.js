import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export default function useCurrentUserQuery(options) {
  return useQuery(CURRENT_USER_QUERY, options);
}
