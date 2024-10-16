import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCalendarXmark,  faComment } from '@fortawesome/free-regular-svg-icons';
import { faBuildingColumns, faCar, faCarOn, faEarthAsia, faFileArrowUp, faFileInvoiceDollar, faHouse, faLocationDot, faMagnifyingGlass, faUsers } from '@fortawesome/free-solid-svg-icons';
const Sidebar_items=[
    {
      name:"Dashboard",
      path:'/',
       iconType:<FontAwesomeIcon icon={faHouse} style={{ fontSize:24 }} />
  },
  {
    name:"Users",
    path:"users",
    iconType:<FontAwesomeIcon icon={faUsers} style={{ fontSize:24 }} />
    
  },
  {
    name:"Events",
    path:"events",
    iconType:<FontAwesomeIcon icon={faCalendarXmark} style={{ fontSize:24 }} />
  },
  {
    name:"Payments",
    path:"payment",
    iconType:<FontAwesomeIcon icon={faFileInvoiceDollar} style={{ fontSize:24 }} />
  },
  {
    name:"Sellers",
    path:"sellers",
    iconType:<FontAwesomeIcon icon={faBuilding} style={{ fontSize:24 }} />
  },
  {
    name:"Locations",
    path:"viewlocation",
    iconType:<FontAwesomeIcon icon={faLocationDot} style={{ fontSize:24 }} />
  },
  {
    name:"States",
    path:"states",
    iconType:<FontAwesomeIcon icon={faEarthAsia} style={{ fontSize:24 }} />
  },
 

  {
    name:"Enquiries",
    path:"enquiry",
    iconType:<FontAwesomeIcon icon={faComment} style={{ fontSize:24 }} />
  },
  
  {
    name:"Events types",
    path:"event-types",
    iconType:<FontAwesomeIcon icon={faCar} style={{ fontSize:24 }} />
  },

  {
    name:"Find Auction",
    path:"find-auction",
    iconType:<FontAwesomeIcon icon={faMagnifyingGlass}  style={{ fontSize:24 }} />
  },
  {
    name:"Institution",
    path:"institution",
    iconType:<FontAwesomeIcon icon={faBuildingColumns} style={{ fontSize:24 }} />
   
  },
  {
    name:"Sell a Car",
    path:"sell-a-car",
    iconType:<FontAwesomeIcon icon={faCarOn} style={{ fontSize:24 }} />
   
  },
  
  {
    name:"Image Upload",
    path:"image-upload",
    iconType:<FontAwesomeIcon icon={faFileArrowUp} style={{ fontSize:24 }} />
   
  },
  
  ]


  export default Sidebar_items