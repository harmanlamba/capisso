import {
  Box,
  Button,
  makeStyles,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IProjectDto,
  ICourseDto,
  IOrganisationDto,
  IContactDto,
} from '../../types/types';
import { ProjectStatus } from '../../enums/enums';
import { Autocomplete } from '@material-ui/lab';
import { SnackbarMessage } from '../utility/SnackbarMessage';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
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
  skeleton: {
    margin: '12px 0',
  },
}));

const projectStatusOptions = [
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'In Progress',
    value: 'InProgress',
  },
  {
    label: 'Completed Successfully',
    value: 'CompletedSuccessfully',
  },
  {
    label: 'Completed With Issues',
    value: 'CompletedWithIssues',
  },
];

export interface IProjectsFormProps {
  initialValues?: IProjectDto;
  onSubmit(project: IProjectDto): Promise<any>;
  type: 'Edit' | 'Add';
  courses: ICourseDto[];
  organisations: IOrganisationDto[];
  setOrganisationId: (organisationId: number) => void;
  contacts: IContactDto[];
  contactsLoading: boolean;
}

export const ProjectsForm: React.FC<IProjectsFormProps> = ({
  initialValues,
  onSubmit,
  type,
  courses,
  organisations,
  setOrganisationId,
  contacts,
  contactsLoading,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          title: '',
          startDate: '',
          endDate: '',
          status: ProjectStatus.Pending,
          notes: undefined,
          outcome: undefined,
          organisationId: 0,
          courseIds: [] as number[],
          contactId: 0,
          ...initialValues,
        }}
        onSubmit={async (values) => {
          try {
            await onSubmit({
              ...values,
              contactId: values.contactId > 0 ? values.contactId : undefined,
              endDate: values.endDate ? values.endDate : undefined,
            } as IProjectDto);
            history.goBack();
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

          if (!values.status) {
            errors.status = 'Required';
          }

          if (!values.organisationId) {
            errors.organisationId = 'Required';
          }

          if (!values.courseIds.length) {
            errors.courseIds = 'Required';
          }

          if (
            contacts.find(
              (c) => c.id === values.contactId && c.hasActiveProject === true
            )
          ) {
            setConfirmationOpen(true);
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
                label="Status"
                name="status"
                onChange={handleChange}
                value={values.status}
                error={!!errors.status}
                fullWidth={true}
                required={true}
                select={true}
              >
                {projectStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

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
                    error={!!errors.organisationId}
                  />
                )}
                onChange={(_e, v) => {
                  setFieldValue('organisationId', v?.id);
                  setOrganisationId(v?.id!);
                }}
                value={organisations.find(
                  (o) => o.id === values.organisationId
                )}
              />

              {contactsLoading ? (
                <Skeleton
                  className={classes.skeleton}
                  variant="rect"
                  width={800}
                  height={57}
                />
              ) : (
                <Autocomplete
                  options={contacts}
                  getOptionLabel={(option) => option.name}
                  noOptionsText="Please choose an organisation before selecting contact"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      variant="filled"
                      label="Project Contact"
                      fullWidth={true}
                      error={!!errors.contactId}
                    />
                  )}
                  onChange={(_e, v) => {
                    setFieldValue('contactId', v?.id);
                  }}
                  value={contacts.find((c) => c.id === values.contactId)}
                />
              )}

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
                    error={!!errors.courseIds}
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
                  startIcon={type === 'Add' ? <Add /> : <Edit />}
                >
                  {type}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <SnackbarMessage
        text="The selected contact is currently associated with an active project"
        severity="warning"
        isOpen={isConfirmationOpen}
        setOpen={setConfirmationOpen}
      />
    </React.Fragment>
  );
};
