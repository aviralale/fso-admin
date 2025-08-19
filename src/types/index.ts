export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: number;
  full_name: string;
  email_address: string;
  phone_number: string;
  city_of_interest: string;
  country_of_interest: string;
  goals: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
