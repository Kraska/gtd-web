import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Tasks from "../Tasks/Tasks";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import InboxIcon from '@material-ui/icons/InboxOutlined';
import DayIcon from '@material-ui/icons/TodayOutlined';
import ProjectsIcon from '@material-ui/icons/FileCopyOutlined';
import ListsIcon from '@material-ui/icons/FormatListBulletedOutlined';

import withHocs from './MainHoc';

import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";


const Container = ({ children, dir }) => (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
    </Typography>
);

const Main = ({ classes }) => (
    <>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={(props) => (<Container><Tasks /></Container>)} />
                <Route path='/today' render={(props) => (<Container><Tasks /></Container>)} />
                <Route path='/projects' render={(props) => (<Container>projects</Container>)}/>
                <Route path='/lists' render={(props) => (<Container>lists</Container>)}/>
            </Switch>

            <BottomNavigation showLabels className={classes.root}>
                <BottomNavigationAction component={Link} to="/" value="inbox" label="Inbox" icon={<InboxIcon />} />
                <BottomNavigationAction component={Link} to="/today" value="today" label="Today" icon={<DayIcon />} />
                <BottomNavigationAction component={Link} to="/projects" value="projects" label="Projects" icon={<ProjectsIcon />} />
                <BottomNavigationAction component={Link} to="/lists" value="lists" label="Lists" icon={<ListsIcon />} />
            </BottomNavigation>
        </BrowserRouter>
    </>
)

export default withHocs(Main);