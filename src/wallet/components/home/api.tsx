export const fetchGoldToCNYPrice = (): Promise<any> => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    /*1baf96aae44fad11f56d9cdc2111dce6*/
    /*0108aa6c9931c3c81118ed09d49f51a2*/
    /*bd291380075fe110c19d9fbcd3671b47*/
    "https://api.metalpriceapi.com/v1/latest?api_key=1baf96aae44fa2111dce6&base=XAU&currencies=CNY",
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
