import { userData } from '../../atoms/index';
import { useRouter } from 'next/router';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import firebase from 'firebase'



function NavBar() {
    const router = useRouter()
    const [user, setUser] = useRecoilState(userData);

    const signout = async () => {
        await firebase.auth().signOut()
        setUser({})
        router.push('/login')
    }


    if (user?.displayName) {
        return (

            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    top: '0',
                    background: '#1a1a2e',
                    color: '#fff'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            style={{
                                width: '2rem',
                                height: '2rem',
                                objectFit: 'contain',
                                borderRadius: '50%'
                            }}
                            src={user.photoURL} />
                        <span
                            style={{
                                marginLeft: '1rem',
                                fontFamily: 'Roboto,sans-serif'
                            }}
                        >{user.displayName}</span>
                    </div>
                    <button onClick={signout}>SignOut</button>
                </div>

            </div>
        )
    }
    else {
        return null
    }

}
export default NavBar;