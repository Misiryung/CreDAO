// 去掉小数点后面的0
export const formatBalance = (rawBalance: string) => {
  const balanceStr = (parseInt(rawBalance) / 100000000).toFixed(8);

  let formattedBalance = balanceStr;
  let decimalIndex = formattedBalance.indexOf('.');
  if (decimalIndex !== -1) {
    for (let i = formattedBalance.length - 1; i > decimalIndex; i--) {
      if (formattedBalance[i] === '0') {
        formattedBalance = formattedBalance.slice(0, i);
      } else {
        break;
      }
    }
    if (formattedBalance[formattedBalance.length - 1] === '.') {
      formattedBalance = formattedBalance.slice(0, -1);
    }
  }

  return formattedBalance;
};

// 普通gas费
export const formatGasPrice = (rawGasPrice: string) => {
  const gasPriceNumber = parseInt(rawGasPrice) * 210;
  const gasPriceStr = (gasPriceNumber / 100000000).toFixed(8);

  let formattedGasPrice = gasPriceStr;
  let decimalIndex = formattedGasPrice.indexOf('.');
  if (decimalIndex !== -1) {
    for (let i = formattedGasPrice.length - 1; i > decimalIndex; i--) {
      if (formattedGasPrice[i] === '0') {
        formattedGasPrice = formattedGasPrice.slice(0, i);
      } else {
        break;
      }
    }
    if (formattedGasPrice[formattedGasPrice.length - 1] === '.') {
      formattedGasPrice = formattedGasPrice.slice(0, -1);
    }
  }

  return formattedGasPrice;
};

// 最大gas费
export const formatGasPrice1 = (rawGasPrice: string) => {
  const gasPriceNumber = parseInt(rawGasPrice) * 252;
  const gasPriceStr = (gasPriceNumber / 100000000).toFixed(8);

  let formattedGasPrice = gasPriceStr;
  let decimalIndex = formattedGasPrice.indexOf('.');
  if (decimalIndex !== -1) {
    for (let i = formattedGasPrice.length - 1; i > decimalIndex; i--) {
      if (formattedGasPrice[i] === '0') {
        formattedGasPrice = formattedGasPrice.slice(0, i);
      } else {
        break;
      }
    }
    if (formattedGasPrice[formattedGasPrice.length - 1] === '.') {
      formattedGasPrice = formattedGasPrice.slice(0, -1);
    }
  }

  return formattedGasPrice;
};


export const formatTimestamp1 = (timestampStr: string) => {
  const timestamp = parseInt(timestampStr);
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};


export const formatTimestamp2 = (timestampStr: string) => {
  const timestamp = parseInt(timestampStr);
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

// 显示前5位和后5位
export const formatAddress = (addr: string) => {
  if (addr.length <= 10) {
    return addr;
  }

  const prefix = addr.substring(0, 5);
  const suffix = addr.substring(addr.length - 5);
  return `${prefix}...${suffix}`;
}

// 显示前18位和后18位
export const formatAddress1 = (addr: string) => {
  if (addr.length <= 36) {
    return addr;
  }

  const prefix = addr.substring(0, 18);
  const suffix = addr.substring(addr.length - 18);
  return `${prefix}...${suffix}`;
}