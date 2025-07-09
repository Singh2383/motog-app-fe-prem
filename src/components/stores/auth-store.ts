import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    email: string;
    id: number;
    is_active: boolean;
    is_email_verified: boolean;
    created_at: string; // could be Date if parsed later
  };
}

interface AuthState {
  token: AuthResponse | undefined;
  setToken: (t?: AuthResponse) => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      token: undefined,
      setToken: (t) => set({ token: t }),
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: 'motog-auth',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
