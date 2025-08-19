import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/axios";
import type { User, LoginCredentials, AuthTokens } from "@/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get("/api/auth/users/me/");
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiClient.post(
        "/api/auth/jwt/create/",
        credentials
      );
      const tokens: AuthTokens = response.data;

      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      await checkAuthStatus();
      navigate("/dashboard");

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
