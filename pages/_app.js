import '../styles/globals.css';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  RecoilRoot,
} from 'recoil';
import client from '../client';
import NavBar from '../components/NavBar'
import { useEffect } from 'react';
import firebase from 'firebase'
import { useRouter } from 'next/router';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAzL-8NjWS1BT1a_GkxIBiPxlmVLHS8uI0",
    authDomain: "choice-1601.firebaseapp.com"
  })
}

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    console.log('runs', router)
    if (!firebase.auth().displayName && !router.pathname.includes('login')) {
      router.push('/login')
    }
  }, [])

  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <NavBar />
        <div
          style={{
            marginTop: '4rem'
          }}
        >
          <Component
            {...pageProps} />
        </div>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
