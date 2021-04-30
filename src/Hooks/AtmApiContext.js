import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import axios from 'axios';
import cityListJson from '../data/cityList.json';

const apiUrlMain = '/api/3/action/datastore_search';
const resourceId = 'b9d690de-0a9c-45ef-9ced-3e5957776b26';

export const AtmApiContext = createContext();

function AtmApiProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  const [bankFilter, setBankFilter] = useState(null);
  const [atmFilter, setAtmFilter] = useState('');

  const cityList = useMemo(() => {
    const tempList = JSON.parse(cityListJson);
    return [...(new Set(tempList))];
  });

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
        const { data } = await axios.post(apiUrlMain, reqBody);
        setSearchResults(data.result.records);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAtmData();
  }, [citySearch, bankFilter, atmFilter]);

  const value = {
    cityList,
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
