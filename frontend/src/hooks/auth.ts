import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";
import api from "@/lib/api";
import { IUser } from "@/services/interfaces/user.interface";
import { toast } from "./use-toast";

interface AuthState {
  token: string | null;
  user: IUser | null;
  signIn: (credentials: { email: string; password: string }) => Promise<any>;
  signInByGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      signIn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          const token = await user.getIdToken();

          const sanitizeToken = token;
          api.defaults.headers.authorization = `Bearer ${sanitizeToken}`;

          set({
            token: sanitizeToken,
            user: {
              uid: user.uid,
              email: user.email || "",
              emailVerified: user.emailVerified,
              displayName: user.displayName || "",
              isAnonymous: user.isAnonymous,
              providerData: [],
              stsTokenManager: {
                refreshToken: "",
                accessToken: "",
                expirationTime: 0,
              },
              createdAt: user.metadata.creationTime || "",
              lastLoginAt: user.metadata.lastSignInTime || "",
              apiKey: "",
              appName: "",
            },
          });

          return { token: sanitizeToken, user };
        } catch (error) {
          toast({
            title: "Erro ao logar",
            description: "Por favor, verifique suas credenciais",
            variant: "destructive",
          });
          throw error;
        }
      },

      signInByGoogle: async () => {
        try {
          const userCredential = await signInWithPopup(
            auth,
            googleAuthProvider
          );
          const user = userCredential.user;
          const token = await user.getIdToken();

          const sanitizeToken = token;
          api.defaults.headers.authorization = `Bearer ${sanitizeToken}`;

          set({
            token: sanitizeToken,
            user: {
              uid: user.uid,
              email: user.email || "",
              emailVerified: user.emailVerified,
              displayName: user.displayName || "",
              isAnonymous: user.isAnonymous,
              providerData: [],
              stsTokenManager: {
                refreshToken: "",
                accessToken: "",
                expirationTime: 0,
              },
              createdAt: user.metadata.creationTime || "",
              lastLoginAt: user.metadata.lastSignInTime || "",
              apiKey: "",
              appName: "",
            },
          });

          return { token: sanitizeToken, user };
        } catch (error) {
          toast({
            title: "Erro ao logar",
            description: "Por favor, verifique suas credenciais",
            variant: "destructive",
          });
          throw error;
        }
      },

      signOut: async () => {
        set({ token: null, user: null });
        api.defaults.headers.authorization = null;
      },
    }),
    {
      name: "@Trivium:auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
