import axios from "axios";
import { FC, FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp, setupToken } from "../api";
import { addUser } from "../redux/reducers/user";
import { useAppDispatch } from "../redux/store";
import { IUser } from "../types";
import { Buffer } from "buffer";

type validInput = {
  error: boolean;
  msg: string;
};

type StatsInputType = {
  name: validInput;
  email: validInput;
  password: validInput;
  confPassword: validInput;
};
const initialStatsInput = {
  name: {
    error: false,
    msg: "",
  },
  email: {
    error: false,
    msg: "",
  },
  password: {
    error: false,
    msg: "",
  },
  confPassword: {
    error: false,
    msg: "",
  },
};

const SignUp: FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser>({
    email: "",
    name: "",
    password: "",
  });
  const [confPass, setConfPass] = useState("");
  const [statsInputs, setStatsInputs] =
    useState<StatsInputType>(initialStatsInput);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const emailValidator = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

      let obj: Partial<StatsInputType> = {};

      const { email, password, name } = user;

      if (!email || !emailValidator.test(email)) {
        obj.email = {
          error: true,
          msg: "digite um email válido!",
        };
      }

      if (!name) {
        obj.name = {
          error: true,
          msg: "Defina um nome",
        };
      }
      if (!password) {
        obj.password = {
          error: true,
          msg: "Defina uma senha",
        };
      }
      if (password.length < 8) {
        obj.password = {
          error: true,
          msg: "A senha precisa ser maior que 8 caracteres!",
        };
      }

      if (password !== confPass) {
        obj.password = {
          error: true,
          msg: "Senhas não coincidem!",
        };
      }

      if (!confPass) {
        obj.confPassword = {
          error: true,
          msg: "Confirme a senha.",
        };
      }

      if (Object.keys(obj).length > 0) {
        setStatsInputs((prev) => ({ ...prev, ...obj }));
      } else {
        setStatsInputs(initialStatsInput);
        handleSignUp({
          ...user,
          password: Buffer.from(user.password).toString("base64"),
        })
          .then((res) => {
            if (res.status === 201) {
              dispatch(addUser(res.data.user));
              setupToken(res.data.token);
              alert("Conta criada! Vamos começar!!");
              navigate("/home");
            }
            setLoading(false);
          })
          .catch((err) => {
            if (axios.isAxiosError(err)) {
              alert(err.response?.data.msg);
            }
            setLoading(false);
          });
      }
      // handleSignUp();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="mx-auto self-center">
        <form onSubmit={handleSubmit}>
          <div className="my-10">
            <h3 className="font-extrabold text-6xl text-info">Churraskin</h3>
            <p className="text-left">Organize sua festa!</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-info text-center">
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
              value={user?.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {statsInputs.name.error && (
              <p className="text-secondary">{statsInputs.name.msg}</p>
            )}
          </div>
          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              value={user?.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {statsInputs.email.error && (
              <p className="text-secondary">{statsInputs.email.msg}</p>
            )}
          </div>
          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered w-full max-w-xs"
              value={user?.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {statsInputs.password.error && (
              <p className="text-secondary">{statsInputs.password.msg}</p>
            )}
          </div>
          <div className="form-control w-full x-w-xs my-2">
            <label className="label">
              <span className="label-text">Confirme a Senha</span>
            </label>
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered w-full max-w-xs"
              value={confPass}
              onChange={(e) => setConfPass(e.target.value)}
            />
            {statsInputs.confPassword.error && (
              <p className="text-secondary">{statsInputs.confPassword.msg}</p>
            )}
          </div>
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className={`btn btn-outline btn-info ${loading ? "loading" : ""}`}
            >
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
