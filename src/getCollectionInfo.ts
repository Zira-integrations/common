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

function memoizePromiseFn (fn: Function): Function {
  const cache = new Map();

  return (...args: any) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    cache.set(
      key,
      fn(...args).catch((error: any) => {
        // Delete cache entry if API call fails
        cache.delete(key);
        return Promise.reject(error);
      })
    );

    return cache.get(key);
  };
}

const cachedGetCollectionInfo = memoizePromiseFn(getCollectionInfo);
export default cachedGetCollectionInfo;
