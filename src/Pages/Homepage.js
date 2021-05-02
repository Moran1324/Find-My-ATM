import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Map from '../Components/Map';
import ContentWrapper from '../Components/ContentWrapper';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

function Homepage() {
  const classes = useStyles();
  return (
    <Grid container justify="space-around">
      <Grid item xs={12} sm={7} className="classes.map">
        <Map />
      </Grid>
      <Grid item xs={12} sm={4} className="classes.map">
        <ContentWrapper />
      </Grid>
    </Grid>
  );
}

export default Homepage;
