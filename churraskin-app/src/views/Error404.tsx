import { FC } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LostImage } from "../assets/lost.svg";

const Error404: FC = () => {
  return (
    <div className="flex h-screen">
      <div className="mx-auto self-center">
        <h3 className="text-5xl font-extrabold">Oops</h3>
        <p className="font-semibold">
          Parece que você tentou acessar um lugar novo, ainda não tem nada
          aqui!!
        </p>
        <div className="w-200 my-12 flex mx-auto justify-center">
          <LostImage width={"100%"} />
        </div>
        <div className="mt-20">
          <button className="btn btn-info btn-outline">
            <Link to="/">Voltar para o inicio</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
