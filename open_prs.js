const alfy = require('alfy');
const { query } = require('./graphql');
const { getRelativeTime } = require('./date');

const graphql = `{
  search(
    first: 20,
    type: ISSUE,
    query: "is:pr is:open author:${process.env.USERNAME} archived:false sort:updated-desc"
  ) {
    nodes {
      ... on PullRequest {
        number
        title
        repository {
          nameWithOwner
        }
        url
        createdAt
        updatedAt
      }
    }
  }
}`;

const filter = (item, input) => {
  return (
    item.title.includes(input) || item.repository.nameWithOwner.includes(input)
  );
};

const map = (o) => {
  const title = `${o.repository.nameWithOwner}: ${o.title}`;
  const createdAt = getRelativeTime(o.createdAt);
  const updatedAt = getRelativeTime(o.updatedAt);
  const subtitle = `#${o.number} opened ${createdAt} - updated ${updatedAt}`;
  return {
    title,
    subtitle,
    arg: o.url,
  };
};

module.exports = async (searchInput) => {
  const { search } = await query(graphql);
  let rawData = search.nodes;
  if (searchInput) {
    rawData = alfy.matches(searchInput, rawData, filter);
  }
  return rawData.map(map);
};
