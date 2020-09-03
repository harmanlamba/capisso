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

import { addProject } from '../../common/api/projects';
import { IProjectDto } from '../../types/types';

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

export const ProjectsForm: React.FC<{}> = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        title: '',
        notes: '',
        startDate: '',
        endDate: '',
        outcome: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addProject(values as IProjectDto);
          history.push('/projects');
        } catch (e) {
          console.error(e);
        }
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.title) {
          errors.title = 'Required';
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Form>
          <Box className={classes.boxContainer} flexDirection="column">
            <Typography variant="h4">Add project</Typography>

            <TextField
              className={classes.textField}
              variant="filled"
              label="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
              required={true}
              error={!!errors.title}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Notes"
              name="notes"
              onChange={handleChange}
              value={values.notes}
              required={true}
              error={!!errors.notes}
              fullWidth={true}
            />

            <TextField
              className={classes.textField}
              variant="filled"
              label="Outcome"
              name="outcome"
              multiline={true}
              rows={5}
              onChange={handleChange}
              value={values.outcome}
              required={true}
              error={!!errors.outcome}
              fullWidth={true}
            />

            <TextField
              type="date"
              className={classes.textField}
              variant="filled"
              label="Start Date"
              name="startDate"
              onChange={handleChange}
              value={values.startDate}
              required={true}
              error={!!errors.startDate}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              type="date"
              className={classes.textField}
              variant="filled"
              label="End Date"
              name="endDate"
              onChange={handleChange}
              value={values.endDate}
              required={true}
              error={!!errors.endDate}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
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
