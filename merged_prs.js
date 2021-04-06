const alfy = require('alfy');
const { query } = require('./graphql');
const { getRelativeTime } = require('./date');

const graphql = `{
  search(
    first: 20,
    type: ISSUE,
    query: "is:pr is:merged author:${process.env.USERNAME} archived:false sort:updated-desc"
  ) {
    nodes {
      ... on PullRequest {
        number
        title
        repository {
          nameWithOwner
        }
        url
        mergedAt
      }
    }
  }
}`;

const filter = (item, input) => {
  const title = item.title.toLowerCase();
  const nameWithOwner = item.repository.nameWithOwner.toLowerCase();
  return title.includes(input) || nameWithOwner.includes(input);
};

const map = (o) => {
  const mergedAt = getRelativeTime(o.mergedAt);
  const subtitle = `${o.repository.nameWithOwner}: #${o.number} merged ${mergedAt}`;
  return {
    title: o.title,
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
