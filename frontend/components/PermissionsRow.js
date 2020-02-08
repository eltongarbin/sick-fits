import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SickButton from './styles/SickButton';
import { possiblePermissions } from './Permissions';

const PermissionsRow = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);

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
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map((permission) => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              type="checkbox"
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
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
