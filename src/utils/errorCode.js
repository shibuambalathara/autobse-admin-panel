export const GetErrorMessage = (errorCode) => {
  const errorMessages = {
    1001: "No such user found. Please check the details and try again.",
    1002: "Failed to update user. Please try again later.",
    1003: "The PAN card number you entered is not valid.",
    1004: "The OTP must be between 4 and 8 digits.",
    1005: "The OTP you entered is incorrect.",
    1006: "The OTP has expired.",
    1007: "Failed to set user OTP.",
    1008: "You haven't set a password. Please log in with OTP or reset your password.",
    1011: "This mobile number is already registered. Please use a different number.",
    1012: "This PAN card number is already registered. Please check or use a different one.",
    1013: "This ID number already exists. Please verify the details.",
    1014: "A temporary token already exists. Please use a new one or contact support.",
    1015: "The provided field already exists. Please check the details and try again.",
    2001: "Only administrators or staff have permission to perform this action.",
    2002: "Invalid username and password.",
    2003: "The auction has ended.",
    2004: "The auction hasn't started yet.",
    2005: "The auction is not active.",
    2006: "No more bids are allowed.",
    2007: "Bid amount must be a multiple of the quote increment.",
    2008: "You are not allowed to bid on this vehicle in this state.",
    2009: "Bid amount is smaller than the starting bid amount.",
    2010: "Bid amount is smaller than your previous bid.",
    2011: "Bid amount is smaller than the current bid.",
    2012: "You’ve reached your buying limit.",
    3001: "No vehicle found. Please check the details.",
    4001: "The payment creation failed.",
    4002: "Payment not found.",
    5011: "The name or state you entered already exists. Please choose a different name."
  };
  return (
    errorMessages[errorCode] || "Something went wrong. Please try again later."
  );
};