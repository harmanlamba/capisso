import React from 'react';
import { Chip } from '@material-ui/core';
import { OrganisationStatus } from '../../enums/enums';

export const OrganisationStatusChip: React.FC<{
  status: OrganisationStatus;
}> = ({ status }) => {
  const color = status === OrganisationStatus.Active ? 'primary' : 'default';

  return <Chip label={status} color={color} />;
};
