import React from 'react';
import { Chip } from '@material-ui/core';

import { ProjectStatus } from '../../enums/enums';

const statusLabels = {
  [ProjectStatus.Pending]: 'Pending',
  [ProjectStatus.InProgress]: 'In Progress',
  [ProjectStatus.CompletedSuccessfully]: 'Completed Successfully',
  [ProjectStatus.CompletedWithIssues]: 'Completed With Issues',
};

export const ProjectStatusChip: React.FC<{ status: ProjectStatus }> = ({
  status,
}) => {
  const label = statusLabels[status];
  let color: 'default' | 'secondary' | 'primary' = 'default';

  if (status === ProjectStatus.CompletedWithIssues) {
    color = 'secondary';
  } else if (status === ProjectStatus.CompletedSuccessfully) {
    color = 'primary';
  }

  return <Chip label={label} color={color} />;
};
