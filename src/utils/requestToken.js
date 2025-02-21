export const requestToken = async () => {
  const url = "https://api.themoviedb.org/3/authentication/token/new";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const responseToekn = await fetch(url, options);
    const token = await responseToekn.json();
    if(!token.success) {
      throw new Error("Error al solicitar el token");
    }
    return {token:token.request_token, message: "Token solicitado correctamente, revisa tu email para continuar"};
  } catch (error) {
    console.error(error);
    return {error, message: "Error al solicitar el token. Intenta mas tarde"};
  }
  
};
