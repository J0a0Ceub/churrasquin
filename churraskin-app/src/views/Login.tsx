import axios from "axios";
import { FC, FormEventHandler, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { handleLoginAPI, setupToken } from "../api";
import { addUser } from "../redux/reducers/user";
import { useAppDispatch } from "../redux/store";

window.Buffer = window.Buffer || require("buffer").Buffer;

type StatsInputType = {
  email: {
    error: boolean;
    msg: string;
  };
  password: {
    error: boolean;
    msg: string;
  };
  response: {
    error: boolean;
    msg: string;
  };
};
const initalStatusInput: StatsInputType = {
  email: {
    error: false,
    msg: "",
  },
  password: {
    error: false,
    msg: "",
  },
  response: {
    error: false,
    msg: "",
  },
};
const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [statsInputs, setStatsInputs] =
    useState<StatsInputType>(initalStatusInput);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailRegex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
    let obj: StatsInputType = initalStatusInput;

    if (!emailRegex.test(email)) {
      obj.email = {
        error: true,
        msg: "Formato de email inválido",
      };
    }
    if (password.length < 8) {
      obj.password = {
        error: true,
        msg: "Senha muito pequena",
      };
    }

    if (obj === initalStatusInput) {
      try {
        setLoading(true);
        let res = await handleLoginAPI(
          email,
          Buffer.from(password).toString("base64")
        );
        setLoading(false);
        if (res.status === 200) {
          dispatch(addUser(res.data.user));
          setupToken(res.data.token);
          navigate("/home");
        } else {
          setStatsInputs((prev) => ({
            ...prev,
            response: {
              error: true,
              msg: "Algo inesperado aconteceu, tente novamente mais tarde",
            },
          }));
        }
      } catch (error) {
        let msg = "Algo inesperado aconteceu, tente novamente mais tarde";
        if (axios.isAxiosError(error)) {
          msg = error.response?.data.msg;
        }
        setStatsInputs((prev) => ({
          ...prev,
          response: {
            error: true,
            msg,
          },
        }));
        setLoading(false);
      }
    } else {
      setStatsInputs(obj);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="mx-auto self-center">
        <form onSubmit={handleLogin}>
          <div className="my-10">
            <h3 className="font-extrabold text-6xl text-white">Churraskin</h3>
            <p className="text-left">Organize sua festa!</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-white text-center">
              Entrar
            </h3>
          </div>

          <div className="form-control w-full x-w-xs my-2">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="form-control w-full x-w-xs my-2">
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered w-full max-w-xs"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          {statsInputs.response.error && (
            <div className="my-5 transition ease-in delay-100">
              <p className="text-error">{statsInputs.response.msg}</p>
            </div>
          )}
          <div className="mt-10 mb-5">
            <button
              type="submit"
              className={`btn btn-outline btn-info ${
                loading ? "loading" : ""
              } `}
            >
              {loading ? "carregando" : "Entrar"}
            </button>
          </div>
          <div className="mt-4">
            <Link to="/sign-up" className="text-xl">
              Criar Conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
