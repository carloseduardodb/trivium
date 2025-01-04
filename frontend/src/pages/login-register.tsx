import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";

export const LoginOrRegister = () => {
  const { signInByGoogle, token } = useAuth();

  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    }
  }, [token]);

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-8">Bem-vindo!</h1>
        <button
          onClick={signInByGoogle}
          className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="w-6 h-6 mr-3"
          />
          Entrar com o Google
        </button>
      </div>
      <Toaster />
    </div>
  );
};
