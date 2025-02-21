import emailjs from "emailjs-com";

export const sendEmailToken = async (templateParams) => {
  try {
    await emailjs
        .send(
          "service_7cf0vnn",
          "template_r1nfa8c",
          templateParams.templateParams,
          "WxwGrsHn8f5s2YbJC"
        )
        return {success: true}
  } catch (error) {
    console.log(error);
    return {success: false, error}
  }
}