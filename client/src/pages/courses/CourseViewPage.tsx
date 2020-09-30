import {
  Box,
  Button,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from 'react-router-dom';
import { getCourse } from '../../common/api/courses';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { CourseViewAbout } from '../../components/courses/CoursesViewAbout';
import { CourseViewProjects } from './CourseViewProjects';
import { ICourseDto } from '../../types/types';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

const tabIdToName = (id: number) => {
  switch (id) {
    case 0:
      return 'about';
    case 1:
      return 'projects';
    default:
      return 'about';
  }
};

const tabNameToId = (name: string) => {
  switch (name) {
    case 'about':
      return 0;
    case 'projects':
      return 1;
    default:
      return 0;
  }
};

export const CourseViewPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id, page } = useParams();
  const value = tabNameToId(page);
  const history = useHistory();

  const handleChange = (_: any, tab: number) => {
    history.push(`/courses/${id}/${tabIdToName(tab)}`);
  };

  const [course, setCourse] = useState<ICourseDto>();

  useEffect(() => {
    async function getSingularCourse() {
      const data: ICourseDto = await getCourse(id);
      setCourse(data);
    }
    getSingularCourse();
  }, [id]);

  return (
    <div className={classes.content}>
      {course ? (
        <>
          <Box mb={2}>
            <Typography variant="h4" display="inline">
              {course.name}
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <Button
                startIcon={<Edit />}
                variant="contained"
                color="primary"
                component={Link}
                to={`/courses/${course.id}/edit`}
              >
                Edit
              </Button>
            </Box>
          </Box>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="About" disableRipple={true} />
            <Tab label="Projects" disableRipple={true} />
          </Tabs>
          <Box pt={2}>
            <Switch>
              <Route
                path="/courses/:id/about"
                exact={true}
                render={() => <CourseViewAbout course={course} />}
              />
              <Route
                path="/courses/:id/projects"
                exact={true}
                render={() => <CourseViewProjects />}
              />
              <Route path="/courses/:id/projects" exact={true} />
              <Route path="*">
                <Redirect to={`/courses/${id}/about`} />
              </Route>
            </Switch>
          </Box>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
