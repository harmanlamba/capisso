import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCourse } from '../../common/api/courses';
import { useOrganisation, useContact } from '../../common/hooks/apiHooks';
import { ICourseDto, IProjectDto } from '../../types/types';
import { ContactStatusChip } from '../contact/ContactStatusChip';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
  },
}));

export const ProjectViewAbout: React.FC<{ project: IProjectDto }> = ({
  project,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const formattedStartDate = moment(project.startDate);
  const formattedEndDate = moment(project.endDate);

  const { organisation } = useOrganisation(project.organisationId);
  const { contact } = useContact(project.contactId);
  const [courses, setCourses] = React.useState<ICourseDto[]>([]);

  useEffect(() => {
    project.courseIds.forEach((courseId) => {
      getCourse(courseId)
        .then((data) => setCourses((courseList) => [...courseList, data]))
        .catch((error) => console.error(error));
    });
  }, [project.organisationId, project.courseIds]);

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" display="inline" color="textSecondary">
              Project Title
            </Typography>
            <Typography variant="subtitle1">{project.title}</Typography>
          </Box>
        </Paper>
      </Box>
      {project.notes && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" display="inline" color="textSecondary">
                Notes
              </Typography>
              <Typography variant="subtitle1">{project.notes}</Typography>
            </Box>
          </Paper>
        </Box>
      )}
      {project.outcome && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" display="inline" color="textSecondary">
                Outcomes
              </Typography>
              <Typography variant="subtitle1">{project.outcome}</Typography>
            </Box>
          </Paper>
        </Box>
      )}
      {project.startDate && project.endDate && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" display="inline" color="textSecondary">
                Start date - End date
              </Typography>
              <Typography variant="subtitle1">
                {formattedStartDate.format('YYYY-MM-DD')} -{' '}
                {formattedEndDate.format('YYYY-MM-DD')}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
      {project.organisationId && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Organisation
                <Button
                  color="primary"
                  size="large"
                  onClick={() =>
                    history.push(
                      `/organisations/${project.organisationId}/about`
                    )
                  }
                >
                  {organisation && (
                    <Typography variant="subtitle1">
                      {organisation.name}
                    </Typography>
                  )}
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
      {project.courseIds && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Courses
              </Typography>
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    <Button
                      color="primary"
                      size="large"
                      onClick={() =>
                        history.push(`/courses/${course.id}/about`)
                      }
                    >
                      {course.code}: {course.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>
        </Box>
      )}
      {project.contactId && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Project Contact Details
              </Typography>
              {contact && (
                <div>
                  <Typography variant="subtitle1">
                    Name: {contact.name}{' '}
                    <ContactStatusChip status={contact.status} />
                  </Typography>
                  {contact.email && (
                    <Typography variant="subtitle1">
                      Email: {contact.email}
                    </Typography>
                  )}
                  {contact.phoneNumber && (
                    <Typography variant="subtitle1">
                      Phone: {contact.phoneNumber}
                    </Typography>
                  )}
                </div>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};
