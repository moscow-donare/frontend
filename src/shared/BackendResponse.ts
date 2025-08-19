export interface BackendResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}