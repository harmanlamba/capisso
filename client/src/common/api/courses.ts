import axios from 'axios';
import { ICourseDto, ICreatedDto, IProjectDto } from '../../types/types';

export const addCourse = async (course: ICourseDto): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/courses`,
    course
  );

  return res.data as ICreatedDto;
};

export const getCourse = async (courseId: number): Promise<ICourseDto> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/courses/${courseId}`
  );

  return res.data as ICourseDto;
};

export const editCourse = async (course: ICourseDto): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/courses/${course.id}`,
    course
  );
};

export const getAllCourses = async (): Promise<ICourseDto[]> => {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE}/courses`);
  return res.data as ICourseDto[];
};

export const getProjectsForCourse = async (
  courseId: number
): Promise<IProjectDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/projects?courseId=${courseId}`
  );

  return res.data as IProjectDto[];
};
