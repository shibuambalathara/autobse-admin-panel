export const bidStatusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Fulfilled', value: 'Fulfilled' },
    { label: 'Declined', value: 'Declined' },
  ];
  export const eventCategories = [
    { value: "online", label: "Online Auction" },
    { value: "open", label: "Open Auction" },
  ];
  
  export const auctionStatuses = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "blocked", label: "Blocked" },
    { value: "ynactive", label: "Inactive" },
    { value: "stop", label: "Stop" },
  ];
  
  export const eventLock = [
    { value: "locked", label: "Locked" },
    { value: "unlocked", label: "Unlocked" },
  ];
 
  export const paymentsFor=[
    
      { value:"registrations",label:"Registration"},
      { value:"emd",label:"Emd"},
    //   { value:"refund",label:"Refund"},
      // { value:"openBids",label:"Open bids"},
    //   { value:"other",label:"Other"}
    
  ]
  export const propertyType=[
    
      { value:"vehicle",label:"Vehicle"},
      { value:"flat",label:"Flat"},
    { value:"mechinery",label:"Mechinery"},
    { value:"gold",label:"Gold"},
    { value:"other",label:"Other"}
  
]
export const eventCategory=[
    {value:"open",label:"Open"},
    {value:"online",label:"Online"}
]