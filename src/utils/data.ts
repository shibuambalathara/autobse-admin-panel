export type IndianState =
  | "Maharashtra"
  | "Bihar"
  | "Chhattisgarh"
  | "Karnataka"
  | "Manipur"
  | "Arunachal_Pradesh"
  | "Assam"
  | "Gujarat"
  | "Punjab"
  | "Mizoram"
  | "Andhra_Pradesh"
  | "West_Bengal"
  | "Goa"
  | "Haryana"
  | "Himachal_Pradesh"
  | "Kerala"
  | "Rajasthan"
  | "Jharkhand"
  | "Madhya_Pradesh"
  | "Odisha"
  | "Nagaland"
  | "TamilNadu"
  | "Uttar_Pradesh"
  | "Telangana"
  | "Meghalaya"
  | "Sikkim"
  | "Tripura"
  | "Uttarakhand"
  | "Jammu_and_Kashmir"
  | "Delhi";

  
  type IndianStateOption = { value: string; label: string };

  export const indianStates: IndianStateOption[] = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Manipur", label: "Manipur" },
    { value: "Arunachal_Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Punjab", label: "Punjab" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Andhra_Pradesh", label: "Andhra Pradesh" },
    { value: "West_Bengal", label: "West Bengal" },
    { value: "Goa", label: "Goa" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal_Pradesh", label: "Himachal Pradesh" },
    { value: "Kerala", label: "Kerala" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Madhya_Pradesh", label: "Madhya Pradesh" },
    { value: "Odisha", label: "Odisha" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "TamilNadu", label: "Tamil Nadu" },
    { value: "Uttar_Pradesh", label: "Uttar Pradesh" },
    { value: "Telangana", label: "Telangana" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "Jammu_and_Kashmir", label: "Jammu and Kashmir" },
    { value: "Delhi", label: "Delhi" },
  ];

  indianStates.sort((a, b) => a.label.localeCompare(b.label));
  