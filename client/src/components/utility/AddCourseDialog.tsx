import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { addCourse } from '../../common/api/courses';
import { CoursesForm } from '../courses/CoursesForm';

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
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add new course</DialogTitle>
      <DialogContent>
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
