import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
      textAlign: 'center',
      margin: '1 auto'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Travel Planner</h1>
    </div>
  )  
};

export default Header;
