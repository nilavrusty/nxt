import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import { userData } from '../../atoms/index';
import { GET_USER_DETAILS } from '../../grahqlQuery/queries';
import { LOGIN } from '../../grahqlQuery/mutations'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'




const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({ ...firebase.auth() });
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false)
  const setUserData = useSetRecoilState(userData)
  // const [getUser, { data, loading, error }] = useLazyQuery(GET_USER_DETAILS, {
  //   onCompleted: () => {
  //     setUser(data);
  //     router.push('/eventslist');
  //   },
  // });

  const [login, { data, load, error }] = useMutation(LOGIN)

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  useEffect(() => {

    (async () => {
      if (user?.email) {
        setLoading(true)
        let data = await login({ variables: { input: { email: user.email, owner: owner } } })
        let x = { ...data.data.createUser, displayName: user.displayName, photoURL: user.photoURL }
        setUserData(x)
        setLoading(false)
        router.push('/eventslist');
      }
      else {
        setUserData({})
        setLoading(false)
      }
    })()

  }, [user])



  useEffect(() => {
    firebase.auth().onAuthStateChanged(async users => {
      console.log('owner', owner)
      setUser({ ...users })
    })
  }, [])

  const signout = async () => {
    await firebase.auth().signOut()
  }



  return (
    <h1>
      {
        loading ? <p>loading...</p> :
          user?.displayName ?
            <div>
              LoggedIN
              {/* <p> Signedin name: {user.displayName} </p>

              <img src={user.photoURL} alt='logo' />

              <button onClick={signout}>SignOut</button> */}
            </div>
            :
            <div>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
              <p style={{ textAlign: 'center' }}><input type='checkbox' checked={owner} onChange={() => { setOwner(!owner) }} /></p>
            </div>
      }
    </h1>
  );
};
export default Page;
