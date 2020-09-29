import axios from 'axios';
import { ICourseDto, ICreatedDto, IProjectDto } from '../../types/types';
import { getAxiosConfig } from '../auth/userAuth';

export const addCourse = async (course: ICourseDto): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/courses`,
    course,
    getAxiosConfig()
  );

  return res.data as ICreatedDto;
};

export const getCourse = async (courseId: number): Promise<ICourseDto> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/courses/${courseId}`,
    getAxiosConfig()
  );

  return res.data as ICourseDto;
};

export const editCourse = async (course: ICourseDto): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/courses/${course.id}`,
    course,
    getAxiosConfig()
  );
};

export const getAllCourses = async (): Promise<ICourseDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/courses`,
    getAxiosConfig()
  );
  return res.data as ICourseDto[];
};

export const getProjectsForCourse = async (
  courseId: number
): Promise<IProjectDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/projects?courseId=${courseId}`,
    getAxiosConfig()
  );

  return res.data as IProjectDto[];
};
