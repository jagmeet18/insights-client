import {
  faUsers,
  faBookmark,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export const NavBarItems = [
  {
    title: "Communities",
    url: '/communities',
    cName: "side-links-communities",
    fontClass: faUsers,
  },
  {
    title: "Rooms",
    url: '/rooms',
    cName: "side-links-virtual-space",
    fontClass: faBookmark,
  },
  {
    title: "Settings",
    url: '#',
    cName: "side-links-settings",
    fontClass: faCog,
  },
  {
    title: "Profile",
    url: '/profile',
    cName: "side-links-profile-page",
    fontClass: faUserCircle,
  },
];
