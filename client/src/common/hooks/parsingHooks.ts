import { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import { IUserDto } from '../../types/types';
import { UserRole } from '../../enums/enums';
import { EMAIL_REGEX, UOA_EMAIL_REGEX } from '../../constants/constants';

export interface UploadCsvUserError {
  message: string;
  row: number;
}

export const useParseUsersCsv = (file: File | null) => {
  const [data, setData] = useState<IUserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<UploadCsvUserError[]>([]);

  useEffect(() => {
    if (file) {
      setData([]);
      setErrors([]);
      setLoading(true);

      parseAsync(file)
        .then(({ users, errors: e }) => {
          setData(users);
          setErrors(e);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [file]);

  return { data, loading, errors };
};

const parseAsync = async (
  file: File
): Promise<{
  users: IUserDto[];
  errors: UploadCsvUserError[];
}> => {
  return new Promise((resolve) => {
    parse(file, {
      complete: (res) => {
        res.data.shift(); // remove first item (the headers)
        const users: IUserDto[] = res.data.map((u: any) => {
          return {
            email: u[0],
            userRole: u[1] || UserRole.User,
          };
        });

        resolve({ users, errors: validateUsers(users) });
      },
      worker: true,
      header: false,
      skipEmptyLines: true,
    });
  });
};

const validateUsers = (users: IUserDto[]): UploadCsvUserError[] => {
  const validationErrors: UploadCsvUserError[] = [];
  users.forEach((u, i) => {
    const row = i + 1;
    if (!u.email) {
      validationErrors.push({ message: 'Email is required', row });
    } else if (!EMAIL_REGEX.test(u.email)) {
      validationErrors.push({
        message: 'Invalid email address',
        row,
      });
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
  return validationErrors;
};
