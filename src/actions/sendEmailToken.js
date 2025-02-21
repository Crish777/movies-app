import emailjs from "emailjs-com";

export const sendEmailToken = async (templateParams) => {
  try {
    await emailjs
        .send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          templateParams.templateParams,
          import.meta.env.VITE_EMAIL_KEY
        )
        return {success: true}
  } catch (error) {
    console.log(error);
    return {success: false, error}
  }
}