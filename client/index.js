import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const link = new HttpLink({ uri: 'http://localhost:4000/' });
export const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});
// const query = gql`
// {
//     allUsers{
//     email
//     _id
//     vote
//     events{
//       name
//     }
//   }
// }

// `
// client.query({query})
// .then(res => {console.log('res',res)})
// .catch((e)=>{console.log('err',e.response)})

export default client;

// 723767851470-qb6p5an5b1d8mm06kdbm2j5jkqt4u4c1.apps.googleusercontent.com
// QkB94F_oiT68rSEM4WVLuGrP
