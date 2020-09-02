import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  makeStyles,
  TextField,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { addCourse } from '../../common/api/courses';
import { ICourseDto } from '../../types/types';

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

export const CoursesForm: React.FC<{}> = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: '',
        code: '',
        description: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addCourse(values as ICourseDto);
          history.push('/courses');
        } catch (e) {
          console.error(e);
        }
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.code) {
          errors.name = 'Required';
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Form>
          <Box className={classes.boxContainer} flexDirection="column">
            <Typography variant="h4">Add course</Typography>

            <TextField
              className={classes.textField}
              variant="filled"
              label="Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              required={true}
              error={!!errors.name}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Code"
              name="code"
              onChange={handleChange}
              value={values.code}
              required={true}
              error={!!errors.code}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Description"
              name="description"
              multiline={true}
              rows={5}
              onChange={handleChange}
              value={values.description}
              required={true}
              error={!!errors.description}
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
                startIcon={<Add />}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
