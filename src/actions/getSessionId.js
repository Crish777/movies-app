export const getSessionId = async (request_token, approved) => {
  const url = "http://localhost:3000/api/get-session";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    },    
    body: JSON.stringify({request_token: request_token, approved: approved})
  };

  try {
    const responseSession = await fetch(url, options);
    const sessionData = await responseSession.json();

    if(!sessionData.success){
      throw new Error("Error al generar el id de la sesión");
    }
    return {...sessionData, message: "Tu sesión ha sido creada correctamente, te redirigiremos a la página principal"};
  } catch (error) {
    console.error(error);
    return {error, message: "Error al solicitar la sesión. Intenta mas tarde"};
  }
};