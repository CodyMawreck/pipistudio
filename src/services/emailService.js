import axios from "axios";

export const sendEmail = async (emailData) => {
  try {
    const endpoint = 'http://localhost:3000/send'
    const response = await axios.post(endpoint, emailData);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}