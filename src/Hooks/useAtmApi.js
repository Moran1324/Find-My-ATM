import React, { useContext } from 'react';
import { AtmApiContext } from './AtmApiContext';

function useAtmApi() {
  return useContext(AtmApiContext);
}

export default useAtmApi;
