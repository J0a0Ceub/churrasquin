import axios from "axios";
import dayjs from "dayjs";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteList, handleEditList } from "../api";
import Wrapper from "../components/Wrapper";
import { editList, removeList } from "../redux/reducers/list";
import { RootState, useAppDispatch } from "../redux/store";
import { IList } from "../types";

type SelectDatePickerProps = {
  title: string;
  list: number[];
  value: number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const getDayArrayFromMonth = (month: number) => {
  let result = [];
  for (let i = 1; i < dayjs().month(month).daysInMonth(); i++) {
    result.push(i);
  }
  return result;
};

const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yearArray = [2022, 2021, 2020, 2019, 2018, 2017];

const SelectDatePicker: FC<SelectDatePickerProps> = ({
  title,
  list,
  value,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs ">{title}</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className="select select-bordered w-24 mx-1"
      >
        {list.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

const initialList: IList = {
  _id: "",
  data: [],
  date: "",
  name: "",
  owner: "",
  shared: [],
};

const EditListPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list } = useSelector((state: RootState) => state);

  const currentList = list.data.find((l) => l._id === id);
  const [editedList, setEditedList] = useState(initialList);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    if (currentList) {
      setDate(dayjs(currentList.date));
      setEditedList(currentList);
    }
  }, [currentList]);

  const handleSaveEditList = async () => {
    setLoadingEdit(true);
    if (currentList) {
      if (
        currentList.name !== editedList.name ||
        !dayjs(currentList.date).isSame(dayjs(editedList.date), "day")
      ) {
        let res = await handleEditList(currentList._id, editedList);

        if (res.status === 200) {
          dispatch(editList(res.data.list));
        }
      }
    }
    setLoadingEdit(false);
  };

  const onSubmitDeleteList = async () => {
    setLoadingDelete(true);
    if (currentList) {
      if (window.confirm(`Excluir ${currentList.name}?`)) {
        console.log(currentList);
        try {
          let res = await handleDeleteList(currentList._id);

          if (res.status === 200) {
            dispatch(removeList(res.data.list._id));
            navigate("/home");
          }
        } catch (error) {
          console.error(error);
          let msg = "Algo de errado aconteceu, tente novamente mais tarde";
          if (axios.isAxiosError(error)) {
            msg = error.response?.data.error || msg;
          }
          alert(msg);
        }
      }
    }
    setLoadingDelete(false);
  };
  return (
    <Wrapper>
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
      <div className="container mx-5">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Nome da Lista</span>
          </label>
          <input
            type="text"
            placeholder="Churras da Galera"
            value={editedList?.name}
            onChange={(e) =>
              setEditedList((prev) => ({ ...prev, name: e.target.value }))
            }
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <h3 className="label-text mt-5 px-1">Data do Churrasco</h3>
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
            value={date.month() + 1}
            title="Mês"
            onChange={(e) =>
              setDate((prev) => prev.month(Number(e.target.value)))
            }
            list={monthArray}
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
        <div className="container flex-1 inline-flex mt-16">
          <button
            onClick={onSubmitDeleteList}
            className={`btn btn-secondary btn-outline mx-1 ${
              loadingDelete ? "loading" : ""
            }`}
          >
            Excluir
          </button>
          <button
            onClick={handleSaveEditList}
            className={`btn btn-success btn-outline mx-1 ${
              loadingEdit ? "loading" : ""
            }`}
          >
            {loadingEdit ? "Carregando" : "Salvar"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditListPage;
