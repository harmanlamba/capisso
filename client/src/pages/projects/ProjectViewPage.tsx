import {
  AppBar,
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
import { getProject } from '../../common/api/projects';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProjectViewAbout } from '../../components/projects/ProjectViewAbout';
import { IProjectDto } from '../../types/types';
import { ProjectStatusChip } from '../../components/projects/ProjectStatusChip';

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
    default:
      return 'about';
  }
};

const tabNameToId = (name: string) => {
  switch (name) {
    case 'about':
      return 0;
    default:
      return 0;
  }
};

export const ProjectViewPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id, page } = useParams();
  const value = tabNameToId(page);
  const history = useHistory();

  const handleChange = (_: any, tab: number) => {
    history.push(`/projects/${id}/${tabIdToName(tab)}`);
  };

  const [project, setProject] = useState<IProjectDto>();

  useEffect(() => {
    async function getSingularProject() {
      const data: IProjectDto = await getProject(id);
      setProject(data);
    }
    getSingularProject();
  }, [id]);

  return (
    <div className={classes.content}>
      {project ? (
        <>
          <Box mb={2}>
            <Typography variant="h4" display="inline">
              {project.title}
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <ProjectStatusChip status={project.status} />
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/projects/${project.id}/edit`}
              >
                Edit
              </Button>
            </Box>
          </Box>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="">
              <Tab label="About" />
            </Tabs>
          </AppBar>
          <Box pt={2}>
            <Switch>
              <Route
                path="/projects/:id/about"
                exact={true}
                render={() => <ProjectViewAbout project={project} />}
              />
              <Route path="*">
                <Redirect to={`/projects/${id}/about`} />
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
