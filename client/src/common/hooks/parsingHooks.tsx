import { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import { IUserDto } from '../../types/types';
import { UserRole } from '../../enums/enums';
import { EMAIL_REGEX, UOA_EMAIL_REGEX } from '../../constants/constants';

export interface UploadCsvUserError {
  message: string;
  row: number;
}

export const useParseUsersCsv = (file: File | undefined) => {
  const [data, setData] = useState<IUserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<UploadCsvUserError[]>([]);

  useEffect(() => {
    if (file) {
      setErrors([]);
      parse(file, {
        complete: (res) => {
          setLoading(false);
          const users = res.data.map((u: any) => {
            return { email: u.email, userRole: u.userRole || UserRole.User };
          });

          const validationErrors: UploadCsvUserError[] = [];
          users.forEach((u, i) => {
            const row = i + 1;
            if (!u.email) {
              validationErrors.push({ message: 'Email is required', row });
            } else if (!EMAIL_REGEX.test(u.email)) {
              validationErrors.push({ message: 'Invalid email address', row });
            } else if (!UOA_EMAIL_REGEX.test(u.email)) {
              validationErrors.push({
                message: 'Invalid email domain (must be @aucklanduni.ac.nz)',
                row,
              });
            }

            if (
              u.userRole &&
              u.userRole !== UserRole.User &&
              u.userRole !== UserRole.Admin
            ) {
              validationErrors.push({ message: 'Invalid user role', row });
            }
          });

          setData(users);
          setErrors(validationErrors);
        },
        header: true,
        transformHeader: (_header, index) =>
          index === 0 ? 'email' : index === 1 ? 'userRole' : '_',
        skipEmptyLines: true,
      });
    }
  }, [file]);

  return { data, loading, errors };
};
