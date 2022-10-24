import { FC, MouseEventHandler, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../api";
import { removeUser } from "../redux/reducers/user";
import { RootState, useAppDispatch } from "../redux/store";
type Props = {
  children: ReactNode;
};
const Wrapper: FC<Props> = ({ children }) => {
  // onmount verificar se esta logado
  // caso contrario joga para login
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!user.logged) {
      navigate("/login");
    }
  }, [navigate, user]);

  const logout: MouseEventHandler = (e) => {
    e.preventDefault();
    removeToken();
    dispatch(removeUser());
    navigate("/login");
  };

  let label = "";

  if (user.user.name) {
    let list = user.user.name.split(" ");
    label = `${list[0].charAt(0)}${list[list.length - 1].charAt(0)}`;
  }

  return (
    <div className="h-screen w-auto">
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <h3 className="font-extrabold text-xl text-center">Churraskin</h3>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="avatar placeholder btn btn-ghost btn-circle"
          >
            <div className="bg-neutral-focus text-neutral-content rounded-full w-16 ">
              <span className="text-xl">{label}</span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/account">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Wrapper;
