import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleGetLists } from "../api";
import Wrapper from "../components/Wrapper";
import { loadLists } from "../redux/reducers/list";
import { RootState, useAppDispatch } from "../redux/store";
import { IList } from "../types";

const Home: FC = () => {
  const [lists, setLists] = useState<IList[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const { user, list } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadingList(true);

    if (list.data.length === 0) {
      handleGetLists().then((res) => {
        setLists(res.data.lists);
        dispatch(loadLists(res.data.lists));
        setLoadingList(false);
      });
    } else {
      setLists(list.data);
      setLoadingList(false);
    }
  }, []);

  return (
    <Wrapper>
      <div className="w-screen">
        <h2 className="text-2xl font-semibold text-left mb-10 mx-1">
          Olá, {user.user.name}
        </h2>
        <div className="flex flex-col justify-center">
          {loadingList ? (
            <div className="radial-progress" />
          ) : (
            <div>
              <h2 className="font-semibold mx-2 mb-1 text-xl">Suas listas</h2>
              {lists.map((list) => (
                <div
                  key={list._id}
                  className="card card-compact bg-base-200 shadow-xl mb-5 mx-5"
                >
                  <div className="card-body text-left">
                    <h2 className="card-title font-bold text-2xl">
                      {list.name}
                    </h2>
                    <p className="font-medium mt-2">
                      Data do churras: {dayjs(list.date).format("DD/MM/YYYY")}
                    </p>
                    <p className="font-extralight">
                      Quantidade de produtos: {list.data.length}
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-outline btn-info btn-sm">
                        <Link to={`/list/${list._id}`}>
                          <GoChevronRight />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
