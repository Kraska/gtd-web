import React from 'react';

import withHocs from './TasksHoc';
import DraggableList from "../utils/DraggableList";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const tasks = [
      { id: '1', primary: 'Съездить в jysk', secondary: undefined, done: false },
      { id: '2', primary: 'Прибрать', secondary: undefined, done: true },
      { id: '3', primary: 'Постирать', secondary: undefined, done: false },
]


class Tasks extends React.Component {
  render() {

      const { classes } = this.props;

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.root}>
                <DraggableList items={tasks} />
            </Paper>
        </div>
    );
  }
};

// const TabContainer = ({ children, dir }) => (
//     <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
//         {children}
//     </Typography>
// );

export default withHocs(Tasks)
