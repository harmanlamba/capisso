import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from '@material-ui/core';
import { addCourse } from '../../common/api/courses';
import { CoursesForm } from '../courses/CoursesForm';

const useStyles = makeStyles(() => ({
  dialog: {
    background: '#f4f4f4',
  },
}));

export interface IAddCourseDialogProps {
  open: boolean;
  close: () => void;
  handleSuccess: (newCourseId?: number) => void;
}

export const AddCourseDialog: React.FC<IAddCourseDialogProps> = ({
  open,
  close,
  handleSuccess,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add new course</DialogTitle>
      <DialogContent className={classes.dialog}>
        <CoursesForm
          type="Add"
          onSubmit={addCourse}
          handleCancel={() => close()}
          handleSubmitSuccess={(newCourseId) => handleSuccess(newCourseId)}
        />
      </DialogContent>
    </Dialog>
  );
};
