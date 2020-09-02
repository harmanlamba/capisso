import React from 'react';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';

import { addCourse } from '../../common/api/courses';
import { ICourseDto } from '../../types/types';

export const CoursesForm: React.FC<{}> = () => {
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
        if (!values.code) {
          errors.name = 'Required';
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
            label="Code"
            name="code"
            onChange={handleChange}
            value={values.code}
            required={true}
            error={!!errors.code}
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
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </form>
      )}
    </Formik>
  );
};
