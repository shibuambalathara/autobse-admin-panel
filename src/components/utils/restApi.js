import store from "../../store/store";

// fileUploadService.js
const token = store.getState().auth.token;
export const fileUploadService = async ({ file, uploadUrl, additionalParams = {}, }) => {
    const formDataPayload = new FormData();
  
    // Append file to the FormData object
    formDataPayload.append("file", file);
  
    // Append any additional parameters
    Object.keys(additionalParams).forEach((key) => {
      formDataPayload.append(key, additionalParams[key]);
    });
  
    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
        body: formDataPayload,
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const result = await response.json();
      if (result.success) {
        console.log("Document upload successful:", result);
        return { success: true, data: result };
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error during document upload:", error);
      return { success: false, error: error.message };
    }
  };
  