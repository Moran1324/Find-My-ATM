import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import useAtmApi from '../Hooks/useAtmApi';

function SearchFilters() {
  const [searchInput, setSearchInput] = useState('');

  const {
    cityList,
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
      <hr />
    </>
  );
}

export default SearchFilters;
