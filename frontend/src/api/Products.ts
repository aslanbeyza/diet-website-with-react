import axios from "axios";

// API'den dönecek olan veri için bir tip tanımlayalım
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  // Burada API'den dönen diğer ürün özelliklerini ekleyebilirsiniz
};

type ApiResponse = {
  success: boolean;
  data: Product[];
  message?: string;
};

// Yeni fonksiyon, sayfa numarası kullanmıyor
export const getAllProducts = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/product" 
    );
    if (response.status !== 200) {
      throw new Error("Veri çekme hatası");
    }
    console.log("beyzaxx",response.data); // API yanıtını konsolda loglama
    return response.data;
  } catch (error) {
    console.error("API hata:", error);
    throw new Error("Veri çekme hatası");
  }
};
