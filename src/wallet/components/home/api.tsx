export const fetchGoldToCNYPrice = (): Promise<any> => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    /**"https://api.metalpriceapi.com/v1/latest?api_key=1baf96aae44fad11f56d9cdc2111dce6&base=XAU&currencies=CNY",**/
    "https://api.metalpriceapi.com/v1/latest?api_key=111dce6&base=XAU&currencies=CNY",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const goldToCNYPrice = result?.rates?.CNY || null;
      return goldToCNYPrice;
    })
    .catch((error) => {
      console.log("error", error);
      return null;
    });
};
