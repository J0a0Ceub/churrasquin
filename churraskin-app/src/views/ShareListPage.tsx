import { FC, FormEventHandler, useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { BsShare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { RootState } from "../redux/reducers";
import { useAppDispatch } from "../redux/store";
import { ReactComponent as Fun } from "../assets/having-fun.svg";
import { IUserInSharedList } from "../types";

const ShareListPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userList, setUserList] = useState<IUserInSharedList[]>([]);

  const { list } = useSelector((state: RootState) => state);
  let currentList = list.data.find((i) => i._id === id);

  useEffect(() => {
    if (currentList) {
      setUserList(currentList.shared);
    }
  }, [currentList?.shared]);

  const handleShare: FormEventHandler = (e) => {
    e.preventDefault();
    alert(userEmail);
  };

  return (
    <Wrapper>
      <div className="mx-2">
        <div className="navbar mb-5">
          <div className="flex-1">
            <button
              className="btn btn-info btn-outline btn-sm"
              onClick={() => navigate(-1)}
            >
              <GoChevronLeft />
            </button>
          </div>
        </div>
        <h3 className="mb-4">Compartilhe sua lista</h3>
        <form onSubmit={handleShare}>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {
              <div className="flex-1 inline-flex justify-start my-2">
                <button
                  type="submit"
                  className="btn btn-outline btn-success btn-sm"
                >
                  <BsShare fontSize={20} className="mr-2" />
                  Compartilhar
                </button>
              </div>
            }
          </div>
        </form>

        {currentList?.shared.length === 0 ? (
          <div className="w-full">
            <p className=" text-center font-semibold text-xl">
              Lista não compartilhada ainda
            </p>
            <div className="w-auto flex-1 flex justify-center mt-5">
              <Fun />
            </div>
          </div>
        ) : (
          <div className="w-full mt-8">
            <p className="text-xl font-semibold">
              {currentList?.name} é compartilhado com essas pessoas:
            </p>
            {userList.map((l) => (
              <div className="card card-compact bg-base-200">
                <div className="card-body">
                  <p className="card-title" key={l._id}>
                    {l.email.replace(
                      /^(.)(.*)(.@.*)$/,
                      (_, a, b, c) => a + b.replace(/./g, "*") + c
                    )}
                  </p>
                  <div className="card-action">
                    <button className="btn btn-outline btn-sm btn-info mx-1">
                      Editar
                    </button>
                    <button className="btn btn-outline btn-sm btn-secondary mx-1">
                      excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ShareListPage;
