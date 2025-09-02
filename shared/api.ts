/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface RequestOtpRequest {
  phone: string;
}
export interface RequestOtpResponse {
  success: boolean;
}

export interface VerifyOtpRequest {
  phone: string;
  code: string;
}
export interface VerifyOtpResponse {
  success: boolean;
  token?: string;
}
