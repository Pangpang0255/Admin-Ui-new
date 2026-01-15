import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const goalService = async () => {
  try {
    const token = localStorage.getItem("token");

    // Satu jalur API untuk semua user
    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Cek apakah user sudah punya data
    if (response.data.data && response.data.data.length > 0) {
      // User sudah punya data - tampilkan data mereka
      return response.data.data[0];
    }
    
    // User belum punya data - tampilkan data default untuk user baru
    return {
      present_amount: 0,
      target_amount: 20000
    };
  } catch (error) {
    // Throw error agar bisa di-catch di dashboard untuk tampilkan snackbar
    console.error("Goal service error:", error);
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg || "Gagal mengambil data goals",
      defaultData: {
        present_amount: 0,
        target_amount: 20000
      }
    };
  }
};

export const expenseService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("=== EXPENSE API DEBUG ===");
    console.log("Full response:", response);
    console.log("response.data:", response.data);
     console.log("response.data.data:", response.data.data);
    console.log("Type of response.data:", typeof response.data);
    console.log("Is array response.data:", Array.isArray(response.data));
    console.log("Is array response.data.data:", Array.isArray(response.data.data));
    
    // Coba berbagai kemungkinan struktur
    if (response.data.data) {
      console.log("Returning response.data.data");
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      console.log("Returning response.data (is array)");
      return response.data;
    } else {
      console.log("No valid data structure found, returning empty array");
      return [];
    }
  } catch (error) {
    console.error("expenseService error:", error);
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};