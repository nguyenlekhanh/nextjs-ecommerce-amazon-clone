import _ from "lodash";

const removeDecimal128 = (data: any) => {
  return _.cloneDeepWith(data, propVal =>{
    if (!propVal) return propVal; // check for undefined 
    if ('Decimal128' == propVal ._bsontype) return propVal.toString();
  });
}

const convertURLSearchParamsToObject = (urlSearchParams: any) => {
  return Object.fromEntries(urlSearchParams)
}

export { removeDecimal128, convertURLSearchParamsToObject }