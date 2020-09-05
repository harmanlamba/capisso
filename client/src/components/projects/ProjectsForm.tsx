import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { Form, Formik, FieldArray } from 'formik';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IProjectDto, ICourseDto, IOrganisationDto } from '../../types/types';
import { Autocomplete } from '@material-ui/lab';

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

export interface IProjectsFormProps {
  initialValues?: IProjectDto;
  onSubmit(project: IProjectDto): Promise<any>;
  type: 'edit' | 'add';
  courses: ICourseDto[];
  organisations: IOrganisationDto[];
}

export const ProjectsForm: React.FC<IProjectsFormProps> = ({
  initialValues,
  onSubmit,
  type,
  courses,
  organisations,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        title: '',
        startDate: '',
        endDate: undefined,
        notes: undefined,
        outcome: undefined,
        organisationId: 0,
        courseIds: [] as number[],
        ...initialValues,
      }}
      onSubmit={async (values) => {
        try {
          await onSubmit(values as IProjectDto);
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

        if (!values.startDate) {
          errors.startDate = 'Required';
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
              label="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
              required={true}
              error={!!errors.title}
              fullWidth={true}
            />
            <TextField
              type="date"
              className={classes.textField}
              variant="filled"
              label="Start Date"
              name="startDate"
              onChange={handleChange}
              value={moment(values.startDate).format('YYYY-MM-DD')}
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
              value={moment(values.endDate).format('YYYY-MM-DD')}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Notes"
              name="notes"
              multiline={true}
              rows={3}
              onChange={handleChange}
              value={values.notes}
              error={!!errors.notes}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Outcome"
              name="outcome"
              multiline={true}
              rows={2}
              onChange={handleChange}
              value={values.outcome}
              fullWidth={true}
            />

            <Autocomplete
              options={organisations}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.textField}
                  variant="filled"
                  label="Organisation"
                  fullWidth={true}
                  required={true}
                />
              )}
              onChange={(_e, v) => setFieldValue('organisationId', v?.id)}
              value={organisations.find((o) => o.id === values.organisationId)}
            />

            <Autocomplete
              multiple={true}
              options={courses}
              getOptionLabel={(course) => `${course?.code}: ${course?.name}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.textField}
                  variant="filled"
                  label="Courses"
                  fullWidth={true}
                  required={true}
                />
              )}
              onChange={(_e, v) =>
                setFieldValue(
                  'courseIds',
                  v.map((course) => course?.id)
                )
              }
              value={values.courseIds.map((id) =>
                courses.find((c) => c.id === id)
              )}
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
