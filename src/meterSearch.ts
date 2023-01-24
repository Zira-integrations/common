import got from 'got';

function mSearch (searchKey: string, apiKey: string): Promise<string> {
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
      return null;
    })
    .catch((err: any) => {
      console.log(err);
      return null;
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

const meterSearch = memoizePromiseFn(mSearch);
export default meterSearch;
