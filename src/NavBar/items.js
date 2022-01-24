import {
  faUsers,
  faBookmark,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export const NavBarItems = [
  {
    title: "communities",
    url: '/communities',
    cName: "side-links-communities",
    fontClass: faUsers,
  },
  {
    title: "rooms",
    url: '/rooms',
    cName: "side-links-virtual-space",
    fontClass: faBookmark,
  },
  {
    title: "profile",
    url: '/profile',
    cName: "side-links-profile-page",
    fontClass: faUserCircle,
  },
];
