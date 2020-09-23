import React from 'react';
import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import { IProjectDto } from '../../types/types';
import moment from 'moment';
import { useOrganisations, useCourses } from '../../common/hooks/apiHooks';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

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

  const { courses } = useCourses();
  const { organisations } = useOrganisations();

  const formattedStartDate = moment(project.startDate);
  const formattedEndDate = moment(project.endDate);
  const projectCourses = courses.filter(({ id }) =>
    project.courseIds.includes(id!)
  );

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color="primary" display="inline">
              Project Title
            </Typography>
            <p>{project.title}</p>
          </Box>
        </Paper>
      </Box>
      {project.notes && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Notes
              </Typography>
              <p>{project.notes}</p>
            </Box>
          </Paper>
        </Box>
      )}
      {project.outcome && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Outcomes
              </Typography>
              <p>{project.outcome}</p>
            </Box>
          </Paper>
        </Box>
      )}
      {project.startDate && project.endDate && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Start date - End date
              </Typography>
              <p>
                {formattedStartDate.format('YYYY-MM-DD')} -{' '}
                {formattedEndDate.format('YYYY-MM-DD')}
              </p>
            </Box>
          </Paper>
        </Box>
      )}
      {project.organisationId && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Organisation:
                <Button
                  color="primary"
                  size="large"
                  onClick={() =>
                    history.push(
                      `/organisations/${project.organisationId}/about`
                    )
                  }
                >
                  {
                    organisations.find((o) => o.id === project.organisationId)
                      ?.name
                  }
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
                {projectCourses.map((course) => (
                  <div key={course.id}>
                    <li>
                      {course.code}: {course.name}
                    </li>
                  </div>
                ))}
              </ul>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};
