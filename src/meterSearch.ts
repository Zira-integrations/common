import got from 'got';

function meterSearch (searchKey: string, apiKey: string): Promise<string> {
  return got
    .get(
      `https://api.zira.us/public/data-sources?limit=1&textSearch=${searchKey}`,
      {
        headers: {
          'X-API-Key': apiKey
        }
      }
    )
    .json()
    .then(({ data }: any) => {
      if (data) {
        return data[0].id;
      }
      return data;
    })
    .catch((err: any) => {
      return err;
    });
}

export default meterSearch;
