// helper function to concatenate url params

const urlConcatenator = (url, queryParamsObj) => {
  let queryParams = '';

  Object.entries(queryParamsObj).forEach((entry) => {
    queryParams += `&${entry[0]}=${entry[1]}`;
  });

  return url + queryParams;
};

export default urlConcatenator;
