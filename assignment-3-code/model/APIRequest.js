import { Alert } from 'react-native';

const QUERY = `{
        user(login: "IjzerenHein") {
            avatarUrl
            login
            bio
            name
            email
            avatarUrl
            bio
            websiteUrl
            createdAt
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories (first: 100){
              totalCount
              nodes {
                name
                owner {
                  ... on User {
                    login
                  }
                }
                description
              }
            }
        }
    }`;

const ApiRequest = async () => {
  // OAuth token
  const url = 'https://api.github.com/graphql';
  let jsonData;
  await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // AUTH is a constant for token
      Authorization: `bearer ${AUTH}`,
    },
    body: JSON.stringify({ query: QUERY }),
  })
    .then((response) => response.json())
    .then((json) => {
      jsonData = json;
    })
    .catch((error) => {
      Alert.alert(error);
    });
  return jsonData;
};

export default ApiRequest;