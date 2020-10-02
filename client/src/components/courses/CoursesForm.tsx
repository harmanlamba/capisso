import React from 'react';
import { Formik, Form } from 'formik';
import { makeStyles, TextField, Button, Box } from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { ICourseDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    margin: '20px 0px',
    maxWidth: 700,
  },
  textField: {
    margin: '12px 0',
  },
  button: {
    margin: '0 5px',
  },
}));

export interface ICourseFormProps {
  initialValues?: ICourseDto;
  onSubmit(course: ICourseDto): Promise<any>;
  type: 'Add' | 'Edit';
  handleCancel: () => void;
  handleSubmitSuccess: (newCourseId?: number) => void;
}
export const CoursesForm: React.FC<ICourseFormProps> = ({
  initialValues,
  onSubmit,
  type,
  handleCancel,
  handleSubmitSuccess,
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: '',
        code: '',
        description: '',
        ...initialValues,
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          const id = await onSubmit(values);
          id ? handleSubmitSuccess(id.id) : handleSubmitSuccess();
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
          errors.code = 'Required';
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
                onClick={() => handleCancel()}
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
