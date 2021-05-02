import React from 'react';
import {
  List, ListItem, Card, SvgIcon, CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useAtmApi from '../Hooks/useAtmApi';
import SingleResult from './SingleResult';

const useStyles = makeStyles({
  list: {
    maxHeight: '75vh',
    overflow: 'auto',
  },
});

function AtmResults() {
  const {
    searchResults, mapCenter, setMapFocus, setMapZoom, atmTypes,
  } = useAtmApi();

  const classes = useStyles();

  const handleClick = (x, y) => {
    setMapFocus(x, y);
    setMapZoom(12);
  };

  return (
    <div className="classes.results">
      <List className={classes.list}>
        {searchResults.map((result) => (
          <ListItem key={result._id}>
            <SingleResult atm={result} handleClick={handleClick} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AtmResults;
