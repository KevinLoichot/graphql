// GraphQL endpoint
const GRAPHQL_URL = 'https://zone01normandie.org/api/graphql-engine/v1/graphql';

/*
  Base GraphQL client.
  Retrieves the JWT from localStorage and sends a POST request
  with the query and optional variables.
*/
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

// Normal query — fetch authenticated user id and login
async function getUser() {
  const query = `{
    user {
      id
      login
    }
  }`;

  return graphqlQuery(query);
}

// Nested query — fetch results with their associated user info
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

// Query with arguments — fetch a single object by its id
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
