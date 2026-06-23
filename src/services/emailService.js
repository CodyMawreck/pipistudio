import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const sendEmail = async (emailData) => {
  try {
    const endpoint = `${apiBaseUrl}/send`;
    const response = await axios.post(endpoint, emailData);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
