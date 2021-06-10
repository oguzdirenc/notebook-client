import setJWTToken from "../../securityUtils/setJWTToken";

export const login = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  return {
    type: "SET_USER",
    payload: {},
  };
};
