import React from 'react';
import { Formik, FieldArray } from 'formik';
import { TextField, Button, Chip } from '@material-ui/core';

import { addOrganisation } from '../../common/api/organisations';
import { IOrganisationDto } from '../../types/types';

export const OrganisationsForm: React.FC<{}> = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        address: '',
        status: '',
        classifications: [],
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addOrganisation(values as IOrganisationDto);
          resetForm();
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
        <form>
          <TextField
            label="Name"
            name="name"
            onChange={handleChange}
            value={values.name}
            required={true}
            error={!!errors.name}
          />
          <TextField
            label="Description"
            name="description"
            multiline={true}
            rows={5}
            onChange={handleChange}
            value={values.description}
            required={true}
            error={!!errors.description}
          />
          <TextField
            label="Address"
            name="address"
            onChange={handleChange}
            value={values.address}
            required={true}
            error={!!errors.address}
          />
          <TextField
            label="Status"
            name="status"
            onChange={handleChange}
            value={values.status}
            required={true}
            error={!!errors.status}
          />
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

                <TextField
                  label="Classifications"
                  onKeyDown={(e: any) => {
                    // enter
                    if (e.keyCode === 13 && e.target.value) {
                      arrayHelpers.push(e.target.value);
                    }
                  }}
                />
              </div>
            )}
          />
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </form>
      )}
    </Formik>
  );
};
