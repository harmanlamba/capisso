import React from 'react';
import { Formik, FieldArray } from 'formik';
import { TextField, Button, Chip } from '@material-ui/core';

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
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form>
          <TextField
            label="Name"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          <TextField
            label="Description"
            name="description"
            multiline={true}
            rows={5}
            onChange={handleChange}
            value={values.description}
          />
          <TextField
            label="Address"
            name="address"
            onChange={handleChange}
            value={values.address}
          />
          <TextField
            label="Status"
            name="status"
            onChange={handleChange}
            value={values.status}
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
