const numberToCurrency = (amount: any) => {
  let format = amount;
  try {
    format = (amount/100).toFixed(2)
  } catch (e) {

  }

  return format;
};

export {
  numberToCurrency
}