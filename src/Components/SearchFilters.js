import React, { useState } from 'react';
import {
  TextField, IconButton, InputAdornment, Select, Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import useAtmApi from '../Hooks/useAtmApi';

function SearchFilters() {
  const [searchInput, setSearchInput] = useState('');

  const {
    cityList,
    banksList,
    atmTypes,
    citySearch,
    setCitySearch,
    bankFilter,
    setBankFilter,
    atmFilter,
    setAtmFilter,
  } = useAtmApi();

  // console.log('cityList[191] === cityList[192]', cityList[191] === cityList[192]);

  return (
    <>
      <div className="classes.searchContainer">
        <Autocomplete
          className="classes.searchAutoComplete"
          freeSolo
          disableClearable
          autoHighlight
          value={citySearch}
          onChange={(e, newVal) => setCitySearch(newVal)}
          inputValue={searchInput}
          onInputChange={(e, newValue) => setSearchInput(newValue)}
          options={cityList}
          groupBy={(option) => option[0]}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search City..."
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment>
                    <IconButton disableRipple>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                type: 'search',

              }}
            />
          )}
        />
      </div>
      <div className="classes.filterSelectionContainer">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Select
              className="classes.atmTypeFilter"
              native
              value={atmFilter}
              onChange={(e) => setAtmFilter(e.target.value)}
            >
              <option value="">כל סוגי הבנקטים</option>
              <option value={atmTypes[1]}>{atmTypes[1]}</option>
              <option value={atmTypes[0]}>{atmTypes[0]}</option>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
              className="classes.bankFilter"
              native
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
            >
              <option value="">כל הבנקים</option>
              {banksList.map((bank) => (
                <option key={bank.code} value={bank.code}>{bank.name}</option>
              ))}
            </Select>
          </Grid>

        </Grid>
      </div>
      <hr />
    </>
  );
}

export default SearchFilters;
