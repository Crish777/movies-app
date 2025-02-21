import { useState } from "react";
import { requestToken } from "../utils/requestToken";
import { sendEmailToken } from "../actions/sendEmailToken";

const Auth = () => {
  const [form, setForm] = useState({ to_email: "", name: "" });
  const [errorToken, setErrorToken] = useState(false);
  const [successToken, setSuccessToken] = useState(false);
  const [tokenMessage, setTokenMessage] = useState("false");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorToken(false);
    setSuccessToken(false);
    setTokenMessage("");
    const { token, error, message } = await requestToken();
    if (error) {
      setErrorToken(true);
      setTokenMessage(message);
    }

    if (token) {
      const templateParams = {
        ...form,
        token,
      };
      const { success, error } = await sendEmailToken({ templateParams });

      if (success) {
        setSuccessToken(true);
        setTokenMessage(message + " 🎉");
        setLoading(false);
        return;
      }

      if (error) {
        setErrorToken(true);
        setTokenMessage(message);
        setLoading(false);
      }
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen flex-col'>
      <div className='mb-12'>
        <h1 className='text-center '>
          Solicita un token para guardar tus películas favoritas
        </h1>
      </div>
      <form className='w-full max-w-sm' onSubmit={handleSubmit}>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-full-name'>
              Nombre
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              className='disabled:opacity-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-full-name'
              type='text'
              placeholder='Jhon Doe'
              disabled={loading}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              required
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              htmlFor='inline-email'>
              Email
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              name='to_email'
              value={form.to_email}
              onChange={handleChange}
              className='disabled:opacity-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-password'
              type='email'
              placeholder='tuemail@example.com'
              disabled={loading}
            />
          </div>
        </div>
        <div className='md:flex md:items-center'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3'>
            <button
              disabled={loading}
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              type='submit'>
              Enviar
            </button>
          </div>
        </div>
      </form>
      {errorToken && <p className='mt-8 text-red-500'>{tokenMessage}</p>}
      {successToken && <p className='mt-8 text-green-500'>{tokenMessage}</p>}
    </div>
  );
};

export default Auth;
