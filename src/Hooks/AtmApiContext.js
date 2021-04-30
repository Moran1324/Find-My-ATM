import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import axios from 'axios';
import cityListJson from '../data/cityList.json';
import urlConcatenator from '../helpers/urlConcatenator';

const apiUrlMain = '/api/3/action/datastore_search';

export const AtmApiContext = createContext();

function AtmApiProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [citySearch, setCitySearch] = useState('אשקלון');
  const [bankFilter, setBankFilter] = useState(13);
  const [atmFilter, setAtmFilter] = useState();

  const cityList = useMemo(() => JSON.parse(cityListJson));

  useEffect(() => {
    const getAtmData = async () => {
      const resourceId = 'b9d690de-0a9c-45ef-9ced-3e5957776b26';
      const filterData = {
        City: citySearch,
        Bank_Code: bankFilter,
        ATM_Type: atmFilter,
      };

      if (citySearch) filterData.City = citySearch;
      if (bankFilter) filterData.Bank_Code = bankFilter;
      if (atmFilter) filterData.ATM_Type = atmFilter;

      const reqBody = {
        resource_id: resourceId,
      };

      const ifTerm = Object.values(filterData).filter((value) => value != null);

      if (ifTerm.length > 0) reqBody.filters = filterData;

      try {
        const { data } = await axios.post(apiUrlMain, reqBody);
        setSearchResults(data.result.records);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAtmData();
  }, [citySearch, bankFilter, atmFilter]);

  const value = { cityList };

  return (
    <AtmApiContext.Provider value={value}>
      {children}
    </AtmApiContext.Provider>
  );
}

export default AtmApiProvider;
