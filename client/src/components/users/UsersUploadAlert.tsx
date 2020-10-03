import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { UploadCsvUserError } from '../../common/hooks/parsingHooks';

export interface IUsersUploadAlertProps {
  errors: UploadCsvUserError[];
}

export const UsersUploadAlert: React.FC<IUsersUploadAlertProps> = ({
  errors,
}) => {
  const groupedErrors = errors.reduce((prev: any, curr) => {
    prev[curr.message] = [...(prev[curr.message] || []), curr];
    return prev;
  }, {});

  return (
    <Alert severity="error">
      <AlertTitle>Error - Invalid Data</AlertTitle>
      Please fix the following issues and try again:
      <ul>
        {Object.keys(groupedErrors).map((key) => {
          const rowsInGroup = groupedErrors[key]
            .map((e: any) => e.row)
            .join(', ');

          return (
            <li key={key}>
              {key} in row{groupedErrors[key].length > 1 ? 's' : ''}:{' '}
              {rowsInGroup}
            </li>
          );
        })}
      </ul>
    </Alert>
  );
};
