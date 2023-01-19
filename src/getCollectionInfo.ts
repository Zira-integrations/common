import got from 'got';

function getCollectionInfo (meterId: string, apiKey: string): Promise<any> {
  return got
    .get(`https://api.zira.us/public/data-sources/${meterId}`, {
      headers: {
        'X-API-Key': apiKey
      }
    })
    .json()
    .then(({ data }: any) => {
      return data.formConfig.collectionInfo;
    })
    .catch((err: any) => {
      return err;
    });
}

export default getCollectionInfo;
