import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, FieldArray, Form } from 'formik';
import {
  TextField,
  Button,
  Chip,
  makeStyles,
  Box,
  MenuItem,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { IOrganisationDto } from '../../types/types';
import { OrganisationStatus } from '../../enums/enums';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    margin: '20px 0px',
    maxWidth: 700,
  },
  textField: {
    margin: '12px 0px',
  },
  button: {
    margin: '0 5px',
  },
  formControl: {
    minWidth: 120,
    margin: '12px 0px',
  },
  classificationsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classificationInput: {
    flexGrow: 1,
    marginRight: '25px',
  },
  classificationButton: {
    margin: '12px 0',
  },
}));

export interface IOrganisationFormProps {
  initialValues?: IOrganisationDto;
  onSubmit(organisation: IOrganisationDto): Promise<any>;
  type: 'Add' | 'Edit';
}
export const OrganisationsForm: React.FC<IOrganisationFormProps> = ({
  initialValues,
  onSubmit,
  type,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const [classificationInput, setClassificationInput] = React.useState<string>(
    ''
  );

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        address: '',
        status: OrganisationStatus.Active,
        classifications: [] as string[],
        ...initialValues,
      }}
      onSubmit={async (values) => {
        try {
          await onSubmit(values);
          history.goBack();
        } catch (e) {
          console.error(e);
        }
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.description) {
          errors.description = 'Required';
        }
        if (!values.address) {
          errors.address = 'Required';
        }
        if (!values.status) {
          errors.status = 'Required';
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Form>
          <Box
            className={classes.boxContainer}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <TextField
              className={classes.textField}
              variant="filled"
              fullWidth={true}
              label="Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              required={true}
              error={!!errors.name}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              fullWidth={true}
              label="Address"
              name="address"
              onChange={handleChange}
              value={values.address}
              required={true}
              error={!!errors.address}
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
              <MenuItem value={OrganisationStatus.Inactive}>Inactive</MenuItem>
              <MenuItem value={OrganisationStatus.Active}>Active</MenuItem>
            </TextField>
            <FieldArray
              name="classifications"
              render={(arrayHelpers) => (
                <div>
                  {values.classifications.map((classification, index) => (
                    <Chip
                      key={index}
                      label={classification}
                      onDelete={() => arrayHelpers.remove(index)}
                    />
                  ))}

                  <div className={classes.classificationsContainer}>
                    <TextField
                      className={`${classes.classificationInput} ${classes.textField}`}
                      variant="filled"
                      label="Classifications"
                      value={classificationInput}
                      onChange={(e) => setClassificationInput(e.target.value)}
                    />
                    <Button
                      className={classes.classificationButton}
                      onClick={() => {
                        arrayHelpers.push(classificationInput);
                        setClassificationInput('');
                      }}
                      variant="contained"
                      color="default"
                    >
                      Add Classification
                    </Button>
                  </div>
                </div>
              )}
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
              fullWidth={true}
              required={true}
              error={!!errors.description}
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
  );
};
