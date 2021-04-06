const alfy = require('alfy');
const { query } = require('./graphql');

const graphql = `{
  viewer {
    starredRepositories(first: 100) {
      edges {
        node {
          nameWithOwner
          description
          stargazerCount
          url
        }
      }
    }
  }
}`;

const filter = ({ node }, input) => {
  const nameWithOwner = node.nameWithOwner.toLowerCase();
  const description = node.description && node.description.toLowerCase();
  return (
    nameWithOwner.includes(input) ||
    (description && description.includes(input))
  );
};

const map = ({ node: o }) => {
  const subtitle = `⭐️ ${o.stargazerCount} | ${o.description}`;
  return {
    title: o.nameWithOwner,
    subtitle,
    arg: o.url,
  };
};

module.exports = async (searchInput) => {
  const { viewer } = await query(graphql);
  let rawData = viewer.starredRepositories.edges;
  if (searchInput) {
    rawData = alfy.matches(searchInput, rawData, filter);
  }
  return rawData.map(map);
};
