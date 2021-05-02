import React from 'react';
import {
  Card, CardContent, Grid, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useAtmApi from '../Hooks/useAtmApi';

const useStyles = makeStyles({
  resultCard: {
    width: '100%',
  },
  bankName: {
    fontWeight: 'bold',
  },
  atmInfo: {
    fontWeight: 'lighter',
    color: 'gray',
  },

});

function SingleResult({ atm, handleClick }) {
  const { atmTypes } = useAtmApi();
  const classes = useStyles();
  return (
    <Card
      className={classes.resultCard}
      onClick={() => handleClick(atm.X_Coordinate, atm.Y_Coordinate)}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid container item xs={10} direction="column">
            <Typography className={classes.bankName} align="right">
              {atm.Bank_Name}
            </Typography>
            <Typography className={classes.atmInfo} align="right" variant="caption">
              {atm.ATM_Address}
              {' '}
              {atm.City}
              {' '}
              |
              {' '}
              {atm.ATM_Type}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <img
              alt="atm type"
              src={atm.ATM_Type === atmTypes[0]
                ? '/red-map-marker.png'
                : '/blue-map-marker.png'}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SingleResult;
