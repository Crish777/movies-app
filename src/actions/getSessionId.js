export const getSessionId = async () => {
  const url = "https://api.themoviedb.org/3/authentication/guest_session/new";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      body: JSON.stringify({request_token: 'aasdjfhsadkfakjsf', approved: 'true'})
    },
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