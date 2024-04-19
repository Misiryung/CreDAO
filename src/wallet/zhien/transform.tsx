export const formatBalance = (rawBalance: string) => {
  const balanceStr = (parseInt(rawBalance) / 100000000).toFixed(8); // 将 wei 转换为以太币，并保留 8 位小数

  let formattedBalance = balanceStr;
  let decimalIndex = formattedBalance.indexOf('.');
  if (decimalIndex !== -1) {
    // 从小数位开始检查，如果是 0，则隐藏它，直到不为 0 的位数为止
    for (let i = formattedBalance.length - 1; i > decimalIndex; i--) {
      if (formattedBalance[i] === '0') {
        formattedBalance = formattedBalance.slice(0, i);
      } else {
        break;
      }
    }
    // 如果小数点后最后一位是 '.'，则去掉小数点
    if (formattedBalance[formattedBalance.length - 1] === '.') {
      formattedBalance = formattedBalance.slice(0, -1);
    }
  }

  return formattedBalance;
};

export const formatTimestamp1 = (timestampStr: string) => {
  const timestamp = parseInt(timestampStr);
  const date = new Date(timestamp);

  // 获取月份、日期、小时、分钟和秒
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  // 构建简化时间格式字符串
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};


export const formatTimestamp2 = (timestampStr: string) => {
  const timestamp = parseInt(timestampStr);
  const date = new Date(timestamp);

  // 获取年份、月份、日期、小时、分钟和秒
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  // 构建标准时间格式字符串
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

export const formatAddress = (addr: string) => {
  if (addr.length <= 10) {
    return addr;
  }

  const prefix = addr.substring(0, 5);
  const suffix = addr.substring(addr.length - 5);
  return `${prefix}...${suffix}`;
}
