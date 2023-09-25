import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, type, proofImage) => {
    setIsLoading(true);
    setError(null);
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("proofImage", proofImage);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/api/${type}/signup`,
      {
        method: "POST",
        body: data,
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: { ...json } });
      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
