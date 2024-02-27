// import axios from "axios";
// import { toast } from "react-toastify";

// export const forgotPassword = async (userData) => {
//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}/api/users/forgotpassword`,
//         userData
//       );
//       toast.success(response.data.message);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       toast.error(message);
//     }
//   };