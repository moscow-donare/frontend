import { cookieStorage } from "wagmi";

export class HttpClient {

  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }

  private async  getAuthHeaders(): Promise<HeadersInit> {
    const web3AuthStorage = cookieStorage.getItem("Web3Auth-state") ?? null;
    if (!web3AuthStorage) {
      console.warn("Web3Auth storage not found, no auth headers will be sent.");
      return {};
    }
    const idToken = JSON.parse(web3AuthStorage)?.idToken;
    if (!idToken) {
      return {};
    }
    console.log("ID Token:", idToken);
    return {
      'Authorization': `Bearer ${idToken}`,
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

  async get<T>(url: string, authRequired: boolean = true,params?: Record<string, string>): Promise<T> {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const headers = await this.getHeaders(authRequired);
    return this.request<T>(`${url}?${queryString}`, { method: "GET", headers });
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
