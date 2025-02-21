import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { RingLoader } from "react-spinners";
import { getSessionId } from "../actions/getSessionId";

const Verification = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Estamos verificando el token, por favor espera un momento");

  useEffect(() => {
    const request_token = queryParameters.get("request_token");
    const approved = queryParameters.get("approved");
    if (queryParameters.size === 0 || !request_token || !approved) {
      navigate("/auth");
      return;
    }

    const requestSessionId = async () => {
      const { sessionId, message } = await getSessionId();
      setMessage(message);
      console.log(sessionId);
      if (sessionId) {
        setTimeout(() => {
          navigate("/");          
        }, 5000);
        return;
      }
    }    
    requestSessionId();
  }, []);

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='relative flex flex-col items-center justify-center'>
        <h1 className='text-center mb-8'>
          {message || "Validando tu sesión"}
        </h1>
        <RingLoader size={100} color='#ffffff' />
      </div>
    </div>
  );
};

export default Verification;
