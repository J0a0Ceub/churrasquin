import { FC, FormEventHandler } from "react";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen">
      <div className="mx-auto self-center">
        <form onSubmit={handleSubmit}>
          <div className="my-10">
            <h3 className="font-extrabold text-6xl text-white">Churraskin</h3>
            <p className="text-left">Organize sua festa!</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-white text-center">
              Criar Conta
            </h3>
          </div>

          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Nome Completo</span>
            </label>
            <input
              type="text"
              placeholder="Fulanin Toperson"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Confirme a Senha</span>
            </label>
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mt-10">
            <button type="submit" className="btn btn-outline btn-info">
              Criar
            </button>
          </div>
          <div className="mt-4">
            <p>
              Já Tem conta? Clique aqui para{" "}
              <Link to="/login">
                <span className="text-xl text-primary ">entrar</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
