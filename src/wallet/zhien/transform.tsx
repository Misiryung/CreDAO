export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatAddress = (addr: string) => {
  if (addr.length <= 10) {
    return addr;
  }

  const prefix = addr.substring(0, 5);
  const suffix = addr.substring(addr.length - 5);
  return `${prefix}...${suffix}`;
}
