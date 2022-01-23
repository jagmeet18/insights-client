import {
  faUsers,
  faBookmark,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export const NavBarItems = [
  {
    title: "communities",
    url: "#", //route to communities page
    cName: "side-links-communities",
    fontClass: faUsers,
  },
  {
    title: "rooms",
    url: "#", //route to virtualspace page
    cName: "side-links-virtual-space",
    fontClass: faBookmark,
  },
  {
    title: "profile",
    url: "#", //route to profile page
    cName: "side-links-profile-page",
    fontClass: faUserCircle,
  },
];
