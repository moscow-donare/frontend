import { BackendResponse } from "./BackendResponse";
import httpClient from "./HttpClient";
const api_route = "manual_validation";

export const ManualValidationService = {
    async acceptValidation() {
        return await httpClient.get<BackendResponse>(`${api_route}/accept`);
    },

    async rejectValidation() {
        return await httpClient.get<BackendResponse>(`${api_route}/reject`);
    },

    async cancelValidation() {
        return await httpClient.get<BackendResponse>(`${api_route}/cancel`);
    }

}
