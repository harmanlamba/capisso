import {
  AppBar,
  Box,
  Button,
  CircularProgress,
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
import { ProjectViewAbout } from '../../components/projects/ProjectViewAbout';
import { IProjectDto } from '../../types/types';

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
  progressRing: {
    marginLeft: '50%',
    paddingTop: '200px',
    paddingBottom: '10px',
  },
}));

const tabIdToName = (id: number) => {
  switch (id) {
    case 0:
      return 'about';
    case 1:
      return 'communications';
    default:
      return 'about';
  }
};

const tabNameToId = (name: string) => {
  switch (name) {
    case 'about':
      return 0;
    case 'communications':
      return 1;
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
              <Link to={`/projects/${project.id}/edit`}>
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
              </Link>
            </Box>
          </Box>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="">
              <Tab label="About" />
              <Tab label="Communications" />
            </Tabs>
          </AppBar>
          <Box pt={2}>
            <Switch>
              <Route
                path="/projects/:id/about"
                exact={true}
                render={() => <ProjectViewAbout project={project} />}
              />
              <Route path="/projects/:id/communications" exact={true} />
              <Route path="*">
                <Redirect to={`/projects/${id}/about`} />
              </Route>
            </Switch>
          </Box>
        </>
      ) : (
        <CircularProgress
          className={classes.progressRing}
          size={60}
          thickness={6}
        />
      )}
    </div>
  );
};
