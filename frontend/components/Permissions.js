import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ErrorMessage from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
];

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const TableRow = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map((permission) => (
        <td>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input type="checkbox" />
          </label>
        </td>
      ))}
      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
  );
};

const Permissions = () => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);

  return (
    <div>
      <ErrorMessage error={error} />
      <div>
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map((permission) => (
                <th key={permission}>{permission}</th>
              ))}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => (
              <TableRow key={user.id} user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Permissions;
