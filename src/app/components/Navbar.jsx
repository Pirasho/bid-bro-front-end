import Link from "next/link";
import Image from "next/image";
import icon from '../../../public/images/logo.png';
import '../styles/home.css';
import { AiFillHome } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import '../../../public/styles.css'

export default function Navbar() {
  return (

    <nav className="flex justify-between items-center bg-slate-800 px-8 headnav" style={{ backgroundColor: 'white', marginBottom:'1rem'}}>

      <div className="flex" style={{alignItems:'center', padding:'0.5rem'}}>
        <Image src={icon} alt="" className="w-8 h-8" />
        <h1 className="font-bold" style={{ fontSize: '1.2rem', fontFamily: 'initial', marginLeft: 5, color:'#031520'}}>ELECTRO BID HUB</h1>
      </div>

      <div className="flex" style={{alignItems:'center'}}>
        <Link className="text-black font-bold" href={"/sellerDashboard/home"}>
          <AiFillHome size={22} className="mr-2" color="#031520" />
        </Link>
        <Link className="text-black font-bold" href={"/sellerDashboard/home"}>
          <IoMdNotifications size={24} className="mr-2" color="#031520" />
        </Link>
        <Link className="text-black font-bold" href={"/sellerDashboard/home"}>
          <BiSolidMessageRounded size={22} className="mr-2" color="#031520" />
        </Link>
        <Link className="text-black font-bold" onClick={()=>{localStorage.removeItem('sellerDetails');}} href={"/sellerDashboard/auth/signin"}>
          <FaSignOutAlt size={22} className="mr-2" color="#031520" />
        </Link>
      </div>

    </nav>

  );
}
