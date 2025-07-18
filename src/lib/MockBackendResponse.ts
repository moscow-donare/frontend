import { BackendResponse } from "./BackendResponse";

export const MockBackendResponse = <T>(data: T): BackendResponse<T> => {
    return {
        data,
        success: true,
        message: "Mock response",
        error: undefined,
    };
};
