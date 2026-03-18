const GRAPHQL_URL = 'https://zone01normandie.org/api/graphql-engine/v1/graphql';

async function graphqlQuery(query, variables = {}) {
  const token = localStorage.getItem('jwt');

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  return result.data;
}

async function getUser() {
  const query = `{
    user {
      id
      login
    }
  }`;

  return graphqlQuery(query);
}

async function getUserResults() {
  const query = `{
    result {
      id
      grade
      user {
        id
        login
      }
    }
  }`;

  return graphqlQuery(query);
}

async function getObjectById(id) {
  const query = `{
    object(where: { id: { _eq: ${id} } }) {
      id
      name
      type
    }
  }`;

  return graphqlQuery(query);
}
