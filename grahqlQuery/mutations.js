import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation LoginUser($input: CREATE_USER!) {
    createUser(input: $input){
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

export const CREATE_EVENTS = gql`
  mutation CreateEvents($input: CREATE_EVENT!) {
    createEvent(input: $input){
      _id
      description
      name
    }
  }
`;