import logo from '../img/logo.svg';
import { domainUrl } from '../config'
import axios from 'axios';

export default function Header({ userNickname, setToken, children, href }) {
    const header = {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    }

    async function deleteSignOut() {
        const signOutResponse = await axios.delete(`${domainUrl}/users/sign_out`, header)
        if (signOutResponse.status === 200) {
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('nickname')
            setToken(null)
        }
    }
    return (
        <>
            <div className='bg-secondary border-b-4 border-primary mb-10'>
                <div className="container font-pixel">
                    <div className='flex items-center py-5'>
                        <img src={logo} alt="" className='mr-auto w-60' />
                        {window.sessionStorage.getItem('token') !== null ? (
                            <>
                                <p className='px-5 font-bold'>{`${userNickname}'s todo`}</p>
                                <p onClick={deleteSignOut} className='cursor-pointer'>log out</p>
                            </>
                        ) : <a className='px-5 font-bold cursor-pointer' href={href}>{children}</a>}
                    </div>
                </div>
            </div>
        </>


    )
}