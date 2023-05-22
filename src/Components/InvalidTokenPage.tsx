import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InvalidTokenPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Invalid Token</h1>
        <p>Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default InvalidTokenPage;
