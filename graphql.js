const alfy = require('alfy');
const axios = require('axios');

exports.query = async (graphql, cacheMaxAge = 60000) => {
  const cached = alfy.cache.get(graphql);
  if (cached) {
    return cached;
  }
  const { data } = await axios({
    method: 'POST',
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    data: {
      query: graphql,
    },
  });
  alfy.cache.set(graphql, data.data, { maxAge: cacheMaxAge });
  return data.data;
};
