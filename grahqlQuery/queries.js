import gql from 'graphql-tag';

export const GET_USER_DETAILS = gql`
  query UserInfo($email: String!) {
    userData(emailID: $email) {
      _id
      email
      owner
      events {
        _id
        name
        description
        owner {
          _id
          email
        }
      }
    }
  }
`;


