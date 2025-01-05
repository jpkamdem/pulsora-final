import axios from "axios"; 
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false); 
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); 

  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:3000/connection/login", formData);
        localStorage.setItem("token", res.data.token);
        setMessage("Connexion réussie !");
      } else {
        await axios.post("http://localhost:3000/connection/register", formData);
        setMessage("Votre compte a été créé");
        setShowPopup(true); 

        setTimeout(() => {
          setShowPopup(false);
          setIsLogin(true); 
        }, 3000);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to home page after successful login or registration
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirection vers la page d'accueil
    }
  }, [navigate]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-blue-900">
      <button
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour à l'accueil
      </button>

      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img
            src="src/assets/authstade.webp"
            alt="Illustration"
            className="w-full h-auto rounded-l-lg  "
          />
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : isLogin ? "Se connecter" : "Créer un compte"}
            </button>
          </form>

          <p className="text-center mt-4">
            {isLogin ? (
              <>
                Pas encore de compte ?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-400 hover:underline"
                >
                  Inscrivez-vous
                </button>
              </>
            ) : (
              <>
                Vous avez déjà un compte ?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-400 hover:underline"
                >
                  Connectez-vous
                </button>
              </>
            )}
          </p>

        </div>
      </div>

      {showPopup && (
        <div className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md text-center animate-fade">
          Votre compte a été créé
        </div>
      )}
    </div>
  );
}
