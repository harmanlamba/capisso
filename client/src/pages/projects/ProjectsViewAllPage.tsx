import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

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

  const [filterTerm, setFilterTerm] = useState<string>();

  const filteredProjects = projects.filter(
    (project) =>
      !filterTerm ||
      project.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
      project.status.toLowerCase().startsWith(filterTerm.toLowerCase()) ||
      project.startDate.startsWith(filterTerm)
  );

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
                startIcon={<Add />}
                to="/projects/add"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Box>
          </Box>
          <Box mt={0.3}>
            <TextField
              id="filter-field"
              onChange={(event) => setFilterTerm(event.target.value)}
              label="Filter"
              variant="outlined"
              size="small"
            />
          </Box>
        </Grid>
      </Box>

      <ProjectsList projects={filteredProjects} />
    </div>
  );
};
