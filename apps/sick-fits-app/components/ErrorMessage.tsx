import { ApolloError, ServerError } from '@apollo/client';
import styled from 'styled-components';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;

  p {
    margin: 0;
    font-weight: 100;
  }

  strong {
    margin-right: 1rem;
  }
`;

function isServerError(
  networkError: ApolloError['networkError']
): networkError is ServerError {
  return (networkError as ServerError)?.result !== undefined;
}

type DisplayErrorProps = {
  error?: ApolloError;
};

export const ErrorMessage = ({ error }: DisplayErrorProps) => {
  if (!error || !error.message) return null;

  if (
    isServerError(error.networkError) &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error: Error, i: number) => (
      <ErrorStyles key={i}>
        <p data-testid="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }

  return (
    <ErrorStyles>
      <p data-testid="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};
