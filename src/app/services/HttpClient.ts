// import Cookies from 'js-cookie';

type ContentType = "application/json" | "multipart/form-data" | "text/plain" | "undefined"; ;

const apiUrl = process.env.API_URL || "http://localhost:3000/api";
class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders() {
    // const token = Cookies.get('backend_token');
    return {
    //   Authorization: token,
    Authorization: "Bearer backend_token",
    };
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const headers = await this.getAuthHeaders();
    const config: RequestInit = {
      ...options,
      headers: { ...headers, ...options.headers },
    };

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);
    //   if (response.status === 401) {
    //       FixifyToaster.sessionExpired();
    //     throw new Error("Sesión expirada");
    //   }
      const data = await response.json() as T;
      return data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: "GET" });
  }

  async post<T>(url: string, data: any, contentType: ContentType = "application/json"): Promise<T> {
    const headers = contentType && contentType !== "undefined" ? { "Content-Type": contentType } : {};
    const body = contentType === "application/json" ? JSON.stringify(data) : data;
    return this.request<T>(url, { method: "POST", body, headers });
  }

  async put<T>(url: string, data: any, contentType: ContentType = "application/json"): Promise<T> {
    const headers = contentType ? { "Content-Type": contentType } : {};
    const body = contentType === "application/json" ? JSON.stringify(data) : data;
    return this.request<T>(url, { method: "PUT", body, headers });
  }

  async delete<T>(url: string, data?: any, contentType: ContentType = "application/json"): Promise<T> {
    const headers = contentType ? { "Content-Type": contentType } : {};
    const body = data ? (contentType === "application/json" ? JSON.stringify(data) : data) : undefined;
    return this.request<T>(url, { method: "DELETE", body, headers });
  }

}

const httpClient = new HttpClient(apiUrl as string);
export default httpClient;
