import axios from 'axios';
import { ICourseDto, ICreatedDto } from '../../types/types';

export const addCourse = async (course: ICourseDto): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/courses`,
    course
  );

  return res.data as ICreatedDto;
};
