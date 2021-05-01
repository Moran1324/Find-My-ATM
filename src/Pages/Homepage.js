import React from 'react';
import { Grid } from '@material-ui/core';
import Map from '../Components/Map';
import ContentWrapper from '../Components/ContentWrapper';

function Homepage() {
  return (
    <Grid container justify="space-around">
      <Grid item xs={12} sm={8} className="classes.map">
        <Map />
      </Grid>
      <Grid item xs={12} sm={3} className="classes.map">
        <ContentWrapper />
      </Grid>
      {/* instead of margin left for now */}
      {/* <Grid item xs={1} /> */}
    </Grid>
  );
}

export default Homepage;
