import { faBuilding, faCalendarXmark, faComment } from '@fortawesome/free-regular-svg-icons';
import { faBuildingColumns, faCar, faCarOn, faEarthAsia, faFileArrowUp, faFileInvoiceDollar, faHouse, faLocationDot, faMagnifyingGlass, faUsers, faGauge, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SidebarItem {
  name: string;
  path: string;
  iconType: IconDefinition;
}

const Sidebar_items: SidebarItem[] = [
  {
    name: "Dashboard",
    path: '/',
    iconType: faGauge
  },
  {
    name: "Users",
    path: "users",
    iconType: faUsers
  },
  {
    name: "Events",
    path: "events",
    iconType: faCalendarXmark
  },
  {
    name: "Payments",
    path: "payment",
    iconType: faCreditCard
  },
  {
    name: "Sellers",
    path: "sellers",
    iconType: faBuilding
  },
  {
    name: "Locations",
    path: "viewlocation",
    iconType: faLocationDot
  },
  {
    name: "States",
    path: "states",
    iconType: faEarthAsia
  },
  // {
  //   name: "Enquiries",
  //   path: "enquiry",
  //   iconType: faComment
  // },
  {
    name: "Vehicle Category",
    path: "event-types",
    iconType: faCar
  },
  // {
  //   name: "Find Auction",
  //   path: "find-auction",
  //   iconType: faMagnifyingGlass
  // },
  // {
  //   name: "Institution",
  //   path: "institution",
  //   iconType: faBuildingColumns
  // },
  // {
  //   name: "Sell a Car",
  //   path: "sell-a-car",
  //   iconType: faCarOn
  // },
  // {
  //   name: "Image Upload",
  //   path: "image-upload",
  //   iconType: faFileArrowUp
  // },
];

export default Sidebar_items;
