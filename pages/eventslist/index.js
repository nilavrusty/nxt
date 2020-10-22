import { useRouter } from 'next/router';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import firebase from 'firebase'
import { userData } from '../../atoms/index';
import { useEffect } from 'react';
import { CREATE_EVENTS } from '../../grahqlQuery/mutations'

const Page = () => {
  const [user, setUser] = useRecoilState(userData);
  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENTS)

  return (
    <div>
      <div>
        <button >Create Event</button>
      </div>
      {user.events?.length ?
        user.events.map(v => (
          <div>
            <h1>Name: &nbsp;&nbsp;{v.name}</h1>
            <h1>Description: &nbsp;&nbsp; {v.description}</h1>
            <h1>Event Owner: &nbsp;&nbsp;{v.owner.email}</h1>
          </div>
        )) : null}
    </div>
  );
};
export default Page;
