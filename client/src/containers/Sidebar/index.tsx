import Logo from "@/assets/icons/icon.svg?react";
import RosterIcon from "@/assets/icons/roster.svg?react";
import FormationIcon from "@/assets/icons/formation.svg?react";
import MenuItem from "@/components/sidebar/MenuItem";
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-[60px] h-full flex flex-col gap-[35px] items-center bg-[#111] py-[18px]">
      <Logo />
      <MenuItem path="/" className="mt-2" focused={location.pathname === '/'}>
        <RosterIcon />
      </MenuItem>
      <MenuItem path="/formation" focused={location.pathname === '/formation'}>
        <FormationIcon />
      </MenuItem>
    </div>
  );
};

export default Sidebar;
