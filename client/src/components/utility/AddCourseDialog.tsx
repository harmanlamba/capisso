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
  modalContent: {
    margin: '-50px -40px  -30px -40px',
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
      <DialogContent>
        <div className={classes.modalContent}>
          <CoursesForm
            type="Add"
            onSubmit={addCourse}
            handleCancel={() => close()}
            handleSubmitSuccess={(newCourseId) => handleSuccess(newCourseId)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
