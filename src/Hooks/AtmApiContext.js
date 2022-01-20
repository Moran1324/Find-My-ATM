import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import axios from 'axios';
import cityListJson from '../data/cityList.json';
import banksList from '../data/banksList.json';

const apiUrlMain = '/api/3/action/datastore_search';
const resourceId = 'b9d690de-0a9c-45ef-9ced-3e5957776b26';
const atmTypes = ['מכשיר מידע/או מתן הוראות\n', 'משיכת מזומן'];
const israelCoordinatesLimit = {
  lat: {
    max: 33.3,
    min: 29.5,
  },
  lng: {
    max: 35.6,
    min: 34.18,
  },
};

const israelLocation = {
  lat: 31.4826581,
  lng: 34.8673620,
};

export const AtmApiContext = createContext();

function AtmApiProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  const [bankFilter, setBankFilter] = useState('');
  const [atmFilter, setAtmFilter] = useState('');
  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCenter] = useState(israelLocation);

  // add empty dependencies array
  const cityList = useMemo(() => {
    const tempList = JSON.parse(cityListJson);
    return [...(new Set(tempList))];
  });
  console.log(searchResults);

  const setMapFocus = (x, y, zoom) => {
    setMapCenter({
      lat: x,
      lng: y,
    });
    setMapZoom(zoom);
  };

  useEffect(() => {
    const getAtmData = async () => {
      const filterData = {
        City: citySearch,
        Bank_Code: bankFilter,
        ATM_Type: atmFilter,
      };

      if (!citySearch) delete filterData.City;
      if (!bankFilter) delete filterData.Bank_Code;
      if (!atmFilter) delete filterData.ATM_Type;

      const reqBody = {
        resource_id: resourceId,
      };

      // array of filter values, removed null or undefined
      const ifTerm = Object.values(filterData).filter((value) => value != null);

      if (ifTerm.length > 0) reqBody.filters = filterData;

      try {
        const { data } = await axios.post(apiUrlMain, reqBody, {headers: {"Access-Control-Allow-Origin": '*'}});
        const tempResults = data.result.records
          .filter((record) => !record.X_Coordinate === false
            || record.Y_Coordinate === false)
          .map((record) => {
            const ifCheck = (record.X_Coordinate < israelCoordinatesLimit.lat.min
            || record.X_Coordinate > israelCoordinatesLimit.lat.max)
            && (record.Y_Coordinate < israelCoordinatesLimit.lng.min
            || record.Y_Coordinate > israelCoordinatesLimit.lng.max);
            if (ifCheck) {
              return {
                ...record,
                X_Coordinate: record.Y_Coordinate,
                Y_Coordinate: record.X_Coordinate,
              };
            }
            return record;
          });
        setSearchResults(tempResults);
        if (citySearch !== '') {
          setMapFocus(tempResults[0].X_Coordinate, tempResults[0].Y_Coordinate, 12);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getAtmData();
  }, [citySearch, bankFilter, atmFilter]);

  const value = {
    mapZoom,
    setMapZoom,
    mapCenter,
    setMapFocus,
    cityList,
    banksList,
    atmTypes,
    searchResults,
    citySearch,
    setCitySearch,
    bankFilter,
    setBankFilter,
    atmFilter,
    setAtmFilter,
  };

  return (
    <AtmApiContext.Provider value={value}>
      {children}
    </AtmApiContext.Provider>
  );
}

export default AtmApiProvider;
