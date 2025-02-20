export interface ApiResponse<T = null> {
    success: boolean;
    data?: T;
    error?: string;
    errors?: Record<string, string>;
}