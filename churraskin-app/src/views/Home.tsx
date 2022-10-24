import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleGetLists } from "../api";
import Wrapper from "../components/Wrapper";
import { RootState } from "../redux/store";
import { IList } from "../types";

const Home: FC = () => {
  const [lists, setLists] = useState<IList[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    setLoadingList(true);
    handleGetLists().then((res) => {
      setLists(res.data.lists);
      setLoadingList(false);
    });
  }, []);

  return (
    <Wrapper>
      <div className="w-11/12">
        <h2 className="text-xl font-semibold  text-left ml-1 mb-10">
          Olá, {user.user.name}
        </h2>
        <div className="grid grid-flow-row">
          {loadingList ? (
            <div className="radial-progress" />
          ) : (
            lists.map((list, i) => (
              <div key={list._id} className="card bg-base-300 shadow-xl m-1">
                <div className="card-body">
                  <h2 className="card-title">{list.name}</h2>
                  <p>
                    Data do churras: ${dayjs(list.date).format("DD/MM/YYYY")}
                  </p>
                  {/* <pre>{JSON.stringify(list, null, 2)}</pre> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
