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
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
    { value: "Blocked", label: "Blocked" },
    { value: "Inactive", label: "Inactive" },
    { value: "Stop", label: "Stop" },
  ];
  
  export const eventLock = [
    { value: "Locked", label: "Locked" },
    { value: "Unlocked", label: "Unlocked" },
  ];
 
  export const paymentsFor=[
    
      { value:"registrations",label:"registrations"},
      { value:"emd",label:"emd"},
    //   { value:"refund",label:"Refund"},
      { value:"openBids",label:"open bids"},
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