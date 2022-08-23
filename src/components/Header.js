import logo from '../img/logo.svg';
import { Link } from "react-router-dom";

function Header({ userNickname, token, onSignOutClick, children, href }) {
  console.log(token)
  return (
    <div className='bg-secondary border-b-4 border-primary mb-10'>
      <div className="container font-pixel">
        <div className='flex items-center py-5'>
          <img src={logo} alt="" className='mr-auto w-60' />
          {
            token ? (
              <>
                <p className='px-5 font-bold'>{`${userNickname}'s todo`}</p>
                <p onClick={onSignOutClick} className='cursor-pointer'>log out</p>
              </>
            ) : <Link to={href}>{children}</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Header