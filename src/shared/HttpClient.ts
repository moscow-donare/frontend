import { Web3Auth } from "@web3auth/modal";

export class HttpClient {

  constructor(private baseURL: string, private web3Auth: Web3Auth | null = null) {
    this.baseURL = baseURL;
  }

  private async  getAuthHeaders(): Promise<HeadersInit> {
    console.log("Web3Auth", this.web3Auth);
    const token = (await this.web3Auth?.getUserInfo())?.idToken ?? null;
    console.log("Token", token);
    if (!token) {
      return {};
    }
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  private getBodyHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
    };
  }

  private async getHeaders(isAuth: boolean): Promise<HeadersInit> {
    console.log("Headers", isAuth);
    return {
      ...(isAuth ? await this.getAuthHeaders() : {}),
      ...this.getBodyHeaders(),
    };
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const headers = {};
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

  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return this.request<T>(`${url}?${queryString}`, { method: "GET" });
  }

  async post<T>(url: string, data: unknown, authRequired: boolean = true): Promise<T> {
    const headers = await this.getHeaders(authRequired);
    console.log(headers)
    const body = JSON.stringify(data)
    return this.request<T>(url, { method: "POST", body, headers });
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const headers = this.getBodyHeaders();
    const body = JSON.stringify(data)
    return this.request<T>(url, { method: "PUT", body, headers });
  }

  async delete<T>(url: string, params?: Record<string, string>): Promise<T> {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return this.request<T>(`${url}?${queryString}`, { method: "DELETE" });
  }
}
