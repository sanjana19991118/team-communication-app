import React from "react";

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/signin-google"; 
    // Or signin-microsoft, signin-github depending on provider
  };

  return (
    <button 
      onClick={handleLogin} 
      className="bg-blue-500 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  );
}
