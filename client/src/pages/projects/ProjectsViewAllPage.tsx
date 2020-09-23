import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Box, Typography, Button, Grid } from '@material-ui/core';

import { ProjectsList } from '../../components/projects/ProjectsList';
import { useProjects } from '../../common/hooks/apiHooks';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
}));

export const ProjectsViewAllPage: React.FC<{}> = () => {
  const classes = useStyles();

  const { projects } = useProjects();

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Grid justify="space-between" container={true}>
          <Box>
            <Typography variant="h4" display="inline">
              Projects
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <Button
                component={Link}
                to="/projects/add"
                variant="contained"
                color="primary"
              >
                + Add
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>

      <ProjectsList projects={projects} />
    </div>
  );
};
