import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../../constants/constants';
import { IContactDto } from '../../types/types';

const useStyles = makeStyles(() => ({
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

export interface IContactFormProps {
  initialValues: IContactDto;
  onSubmit(contact: IContactDto): Promise<any>;
  type: 'edit' | 'add';
}

export const ContactForm: React.FC<IContactFormProps> = ({
  initialValues,
  onSubmit,
  type,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: undefined,
        phoneNumber: undefined,
        ...initialValues,
      }}
      onSubmit={async (values) => {
        try {
          await onSubmit(values as IContactDto);
          history.push(
            `/organisations/${initialValues.organisationId}/contacts`
          );
        } catch (e) {
          console.error(e);
        }
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.name) {
          errors.name = 'Required';
        }

        if (values.email && !EMAIL_REGEX.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (
          values.phoneNumber &&
          !PHONE_NUMBER_REGEX.test(values.phoneNumber)
        ) {
          errors.phoneNumber = 'Invalid phone number';
        }

        if (!values.organisationId) {
          errors.organisationId = 'Required';
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit, errors, setFieldValue }) => (
        <Form>
          <Box className={classes.boxContainer} flexDirection="column">
            <TextField
              className={classes.textField}
              variant="filled"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              value={values.name}
              required={true}
              error={!!errors.name}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={values.email}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              autoComplete="tel"
              onChange={handleChange}
              value={values.phoneNumber}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              fullWidth={true}
            />
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
                startIcon={type === 'add' ? <Add /> : <Edit />}
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
