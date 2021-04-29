import React from 'react';
import { Grid } from '@material-ui/core';
import SearchFilters from './SearchFilters';
import AtmResults from './AtmResults';

function ContentWrapper() {
  return (
    <Grid container direction="column">
      <Grid item>
        <SearchFilters />
      </Grid>
      <Grid item>
        <AtmResults />
      </Grid>
    </Grid>
  );
}

export default ContentWrapper;
