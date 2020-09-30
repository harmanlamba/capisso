import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  makeStyles,
  TextField,
  Button,
  Box,
  MenuItem,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';

import { IUserDto } from '../../types/types';
import { UserRole } from '../../enums/enums';
import { UOA_EMAIL_REGEX } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    margin: '50px 40px',
    maxWidth: 800,
  },
  textField: {
    margin: '12px 0',
  },
  button: {
    margin: '0 5px',
  },
}));

export interface IUserFormProps {
  initialValues?: IUserDto;
  onSubmit(course: IUserDto): Promise<any>;
  type: 'Add' | 'Edit';
}
export const UsersForm: React.FC<IUserFormProps> = ({
  initialValues,
  onSubmit,
  type,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        userRole: UserRole.User,
        ...initialValues,
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await onSubmit(values);
          history.push('/users');
        } catch (e) {
          console.error(e);
        }
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.email) {
          errors.email = 'Required';
        }

        if (values.email && !UOA_EMAIL_REGEX.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.userRole) {
          errors.userRole = 'Required';
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Form>
          <Box className={classes.boxContainer} flexDirection="column">
            <TextField
              className={classes.textField}
              variant="filled"
              label="Email"
              name="email"
              onChange={handleChange}
              value={values.email}
              required={true}
              error={!!errors.email}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="User Role"
              name="userRole"
              onChange={handleChange}
              value={values.userRole}
              error={!!errors.userRole}
              fullWidth={true}
              required={true}
              select={true}
            >
              <MenuItem value={UserRole.User}>User</MenuItem>
              <MenuItem value={UserRole.Admin}>Admin</MenuItem>
            </TextField>
            <Box
              className={classes.textField}
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
            >
              <Button
                className={classes.button}
                variant="contained"
                color="default"
                onClick={() => {
                  history.goBack();
                }}
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
                startIcon={type === 'Add' ? <Add /> : <Edit />}
              >
                {type}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
