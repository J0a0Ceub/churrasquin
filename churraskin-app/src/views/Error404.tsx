import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LostImage } from "../assets/lost.svg";

const Error404: FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="flex h-screen">
      <div className="mx-5 self-center">
        <h3 className="text-5xl font-extrabold">Oops</h3>
        <p className="font-semibold">
          Parece que você tentou acessar um lugar novo, ainda não tem nada
          aqui!!
        </p>
        <div className="w-200 my-12 flex mx-auto justify-center">
          <LostImage width={"100%"} />
        </div>
        <div className="mt-20 flex justify-center">
          <button onClick={goBack} className="btn btn-info btn-outline">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
