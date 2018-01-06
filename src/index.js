
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui-next/Button';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import { withStyles } from 'material-ui-next/styles';
import * as data from './data.json';
import { Calendar } from './Calendar';

const styles = {
  content: {
    paddingTop: 80,
    height: '100vh',
    // background: '#ff11fe',
    
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  H: {
    // border: '2px solid black',
    width: 200,
    margin: 10,
  }
};

console.log(data.habits)

const H = withStyles(styles)(props => {
  return (
    <Card className={props.classes.H}>
      <CardContent>
        <Typography>{props.routine}</Typography>
        <Calendar 
        />
      </CardContent>
    </Card>
  );
});

const App = withStyles(styles)(function({classes}) {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography type='title' color='inherit'>
            Title
          </Typography>
        </Toolbar>
      </AppBar>
      
      <div className={classes.content}>
        {
          data.habits.map(h => <H {...h} />)
        } 
      </div>
    </div>
  );
});

render(<App />, document.querySelector('#root'));




