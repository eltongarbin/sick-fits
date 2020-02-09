import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import SickButton from './styles/SickButton';
import { possiblePermissions } from './Permissions';
import ErrorMessage from './ErrorMessage';

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const PermissionsRow = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useMutation(
    UPDATE_PERMISSIONS_MUTATION,
    {
      variables: { permissions, userId: user.id }
    }
  );

  const handlePermissionChange = (e) => {
    const checkbox = e.target;

    setPermissions((prev) => {
      let updatedPermissions = [...prev];

      if (checkbox.checked) {
        updatedPermissions.push(checkbox.value);
      } else {
        updatedPermissions = updatedPermissions.filter(
          (permission) => permission !== checkbox.value
        );
      }

      return updatedPermissions;
    });
  };

  return (
    <>
      <tr>
        <td colSpan="8">
          <ErrorMessage error={error} />
        </td>
      </tr>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map((permission) => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton
            type="button"
            disable={loading}
            onClick={updatePermissions}
          >
            Updat{loading ? 'ing' : 'e'}
          </SickButton>
        </td>
      </tr>
    </>
  );
};

PermissionsRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    permissions: PropTypes.array.isRequired
  }).isRequired
};

export default PermissionsRow;
