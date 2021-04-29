import React from 'react';
import { Grid } from '@material-ui/core';
import Map from '../Components/Map';
import ContentWrapper from '../Components/ContentWrapper';

function Homepage() {
  return (
    <Grid container>
      <Grid item xs={12} sm={9} className="classes.map">
        <Map />
      </Grid>
      <Grid item xs={12} sm={3} className="classes.map">
        <ContentWrapper />
      </Grid>
    </Grid>
  );
}

export default Homepage;
