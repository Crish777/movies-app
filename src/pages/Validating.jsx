import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { RingLoader } from "react-spinners";
import { getSessionId } from "../actions/getSessionId";
import {getTokenId} from "../store/sessionSlice";
import { useDispatch} from "react-redux";

const Verification = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Estamos verificando el token, por favor espera un momento");
  const dispatch = useDispatch();

  useEffect(() => {
    const request_token = queryParameters.get("request_token");
    const approved = queryParameters.get("approved");
    if (queryParameters.size === 0 || !request_token || !approved) {
      navigate("/auth");
      return;
    }

    const requestSessionId = async () => {
      const { guest_session_id, message } = await getSessionId(request_token, approved);
      
      setMessage(message);
      if (guest_session_id) {
        dispatch(getTokenId(guest_session_id));
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
        <h1 className=' mb-8 text-center text-black dark:text-white text-xl font-bold '>
          {message || "Validando tu sesión"}
        </h1>
        <RingLoader size={100} className="text-black dark:text-white" />
      </div>
    </div>
  );
};

export default Verification;
