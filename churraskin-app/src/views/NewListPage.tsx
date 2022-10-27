import axios from "axios";
import dayjs from "dayjs";
import { FC, FormEventHandler, useState } from "react";
import { GoChevronLeft, GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { handleCreateList } from "../api";
import SelectDatePicker, {
  generateArray,
  getDayArrayFromMonth,
  getMonthIndexByName,
  monthArray,
  monthStrArray,
  yearArray,
} from "../components/SelectDatePicker";
import Wrapper from "../components/Wrapper";
import list, { addList } from "../redux/reducers/list";
import { useAppDispatch } from "../redux/store";
import { IList } from "../types";

const NewListPage: FC = () => {
  const [newList, setNewList] = useState<IList>({
    _id: "",
    data: [],
    date: dayjs().format(),
    name: "",
    owner: "",
    shared: [],
  });
  const [date, setDate] = useState(dayjs().locale("pt-br"));
  const [errorInput, setErrorInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const { name } = newList;
    console.log("handle submit");
    if (!name) {
      setErrorInput("O Evento precisa de um nome!!");
    } else {
      newList.date = date.toISOString();
      setLoading(true);

      handleCreateList(newList)
        .then((res) => {
          if (res.status === 201) {
            alert("Ihuu Lista criada!");
            dispatch(addList(res.data.list));
            navigate("/home");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          if (axios.isAxiosError(err)) {
            alert(
              err.response?.data.msg ||
                "Algo de errado aconteceu, tente novamente mais tarde"
            );
          }
          setLoading(false);
        });
    }
  };

  // console.log(date);
  // console.log(date.format("MMMM"));
  // console.log(monthArray.map((i) => date.month(i).format("MMM")));

  return (
    <Wrapper>
      <div className="navbar mb-5">
        <div className="flex-1">
          <button
            className="btn btn-info btn-outline btn-sm"
            onClick={() => navigate("/home")}
          >
            <GoChevronLeft />
            voltar
          </button>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-grow justify-center">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nome da Lista</span>
              </label>
              <input
                type="text"
                placeholder="Churras da Galera"
                value={newList.name}
                onChange={(e) =>
                  setNewList((prev) => ({ ...prev, name: e.target.value }))
                }
                className="input input-bordered w-full max-w-xs"
              />
              {errorInput && <p className="text-secondary">{errorInput}</p>}
              <h3 className="label-text font-semibold mt-5 px-1">
                Data do Evento
              </h3>
              <div className="flex-1 inline-flex mt-1">
                <SelectDatePicker
                  title="Dia"
                  value={date.date()}
                  list={getDayArrayFromMonth(date.month())}
                  onChange={(e) =>
                    setDate((prev) => prev.date(Number(e.target.value)))
                  }
                />
                <SelectDatePicker
                  value={date.format("MMM")}
                  title="Mês"
                  onChange={(e) =>
                    setDate((prev) =>
                      prev.month(getMonthIndexByName(e.target.value))
                    )
                  }
                  list={monthStrArray}
                />
                <SelectDatePicker
                  value={date.year()}
                  title="Ano"
                  onChange={(e) =>
                    setDate((prev) => prev.year(Number(e.target.value)))
                  }
                  list={yearArray}
                />
              </div>
              <div className="flex-1 inline-flex mt-1">
                <SelectDatePicker
                  value={date.hour()}
                  title="Hora"
                  onChange={(e) =>
                    setDate((prev) => prev.hour(Number(e.target.value)))
                  }
                  list={generateArray(24)}
                />
                <SelectDatePicker
                  value={date.minute()}
                  title="Minuto"
                  onChange={(e) =>
                    setDate((prev) => prev.minute(Number(e.target.value)))
                  }
                  list={generateArray(60)}
                />
              </div>
            </div>
            <div className="flex flex-1 justify-center mt-48">
              <button
                type="submit"
                className={`btn btn-outline btn-success w-56 btn-sm ${
                  loading ? "loading" : ""
                }`}
              >
                <GoPlus /> Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewListPage;
