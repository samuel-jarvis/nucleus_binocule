import { RxHamburgerMenu } from "react-icons/rx";
import FullLogo from '../../.../../../assets/logo/full_logo.png'
import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useAppSelector } from "../../../hooks/reduxHooks";
import { IUser } from "../../profile/Profile";

const TopBar = () => {
  const user: IUser = useAppSelector((state) => state.auth.user);
  
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-4 bg-white shadow-sm">
        <div className="flex items-center">
          <RxHamburgerMenu className="text-3xl text-black cursor-pointer" />
          <Link to="/home">
          <img src={FullLogo} alt="logo" className="h-16" />
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/profile">
            {
              user.photo.url ? (
                <img src={user.photo.url} alt="profile" className="w-10 h-10 rounded-full" />
              ) : (
                <BsPersonCircle className="text-3xl text-gray-500 cursor-pointer" />
              )
            }
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar