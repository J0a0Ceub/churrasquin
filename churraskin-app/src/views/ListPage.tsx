import dayjs from "dayjs";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ThreeDots from "../assets/three-dots";
import ProductList from "../components/ProductList";
import Wrapper from "../components/Wrapper";
import { RootState, useAppDispatch } from "../redux/store";
import { CategoryTypes, IIndexable, IList, IProduct } from "../types";
import { HiPlus } from "react-icons/hi";
import { GoChevronLeft, GoDash, GoPlus } from "react-icons/go";
import { handleCreateProduct } from "../api";
import { editList } from "../redux/reducers/list";
import axios from "axios";

type ErrorInputType = {
  name: {
    error: boolean;
    msg: string;
  };
  category: {
    error: boolean;
    msg: string;
  };
};
const initalErrorInputType: ErrorInputType = {
  name: {
    error: false,
    msg: "",
  },
  category: {
    error: false,
    msg: "",
  },
};
const ListPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { list } = useSelector((state: RootState) => state);

  const [newProduct, setNewProduct] = useState<IProduct>({
    _id: "",
    name: "",
    quantity: 0,
    category: CategoryTypes[0],
  });
  const [errorsInput, setErrorsInput] =
    useState<ErrorInputType>(initalErrorInputType);
  const [loadingCreateNewProduct, setLoadinCreatingNewProduct] =
    useState(false);

  let currentList = list.data.find((i) => i._id === id);

  const handleEditList = async (listId: string, update: IList) => {
    let result = false;

    return result;
  };

  const checkErrorsInput = (obj: ErrorInputType) =>
    Object.keys(obj)
      .map((key) => (obj as IIndexable)[key].error)
      .reduce((a, b) => a || b);

  const submitCreateProduct = async () => {
    const { category, name } = newProduct;
    let newError: ErrorInputType = initalErrorInputType;

    if (!category) {
      newError.category = {
        error: true,
        msg: "Selecione pelo menos uma categoria!",
      };
    }
    if (!name) {
      newError.name = {
        error: true,
        msg: "Dê um nome ao produto!",
      };
    }

    let hasErrors = checkErrorsInput(newError);

    if (hasErrors) {
      setErrorsInput(newError);
    } else {
      if (currentList) {
        try {
          setLoadinCreatingNewProduct(true);
          let res = await handleCreateProduct(currentList._id, newProduct);
          if (res.status === 200) {
            dispatch(editList(res.data.list));
            let a = document.getElementById(
              "new-product-button-modal"
            ) as HTMLAnchorElement;
            a.href = "#";
            a.click();
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data.msg);
          }
        }
        setLoadinCreatingNewProduct(false);
      }
    }
  };

  return (
    <Wrapper>
      <div className="navbar mb-5">
        <div className="flex-1">
          <button
            className="btn btn-info btn-outline btn-sm"
            onClick={() => navigate("/home")}
          >
            <GoChevronLeft />
          </button>
          <a href="#new-product-modal" className="btn btn-accent btn-sm mx-1">
            <HiPlus />
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost btn-square">
            <ThreeDots />
          </button>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-auto"
          >
            <li>
              <Link to={`/list/${currentList?._id}/edit`}>Editar</Link>
            </li>
            <li>
              <Link to={`/list/${currentList?._id}/share`}>compartilhar</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-2">
        <div className="grid grid-flow-col mb-10">
          <div className="grid-cols-10 items-start text-2xl font-extrabold">
            <span>{currentList?.name}</span>
          </div>
          <div className="grid-cols-2 text-right">
            <span className="text-xs">
              {dayjs(currentList?.date).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
        </div>

        <ProductList
          onSubmitList={handleEditList}
          listId={currentList?._id}
          productList={currentList?.data}
        />
      </div>

      <div className="modal" id="new-product-modal">
        <div className="modal-box relative">
          <a
            id="new-product-button-modal"
            href="# "
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </a>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              placeholder="Nome do Produto"
              className="input input-bordered w-full max-w-xs"
              value={newProduct.name}
              onChange={(e) => {
                setErrorsInput((prev) => ({
                  ...prev,
                  name: {
                    error: false,
                    msg: "",
                  },
                }));
                setNewProduct((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            {errorsInput.name.error && (
              <p className="text-secondary text-center text-sm">
                {errorsInput.name.msg}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Quantidade</span>
            </label>
            <div className="flex flex-1 justify-center w-full items-center">
              <button
                disabled={newProduct.quantity === 0}
                onClick={() =>
                  setNewProduct((prev) => ({
                    ...prev,
                    quantity: newProduct.quantity - 1,
                  }))
                }
                className="btn btn-sm btn-outline btn-info w-10 h-10"
              >
                <GoDash />
              </button>
              <input
                type="number"
                placeholder="0"
                min={0}
                value={newProduct.quantity}
                className="input input-bordered w-12 mx-2 h-10"
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
              />
              <button
                onClick={() =>
                  setNewProduct((prev) => ({
                    ...prev,
                    quantity: newProduct.quantity + 1,
                  }))
                }
                className="btn btn-sm btn-outline btn-info w-10 h-10"
              >
                <GoPlus />
              </button>
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Categoria</span>
            </label>
            <select
              className="select select-bordered"
              placeholder="Selecione uma categoria"
              value={newProduct.category}
              onChange={(e) => {
                setErrorsInput((prev) => ({
                  ...prev,
                  category: {
                    error: false,
                    msg: "",
                  },
                }));
                setNewProduct((prev) => ({
                  ...prev,
                  category: e.target.value,
                }));
              }}
            >
              {CategoryTypes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errorsInput.category.error && (
              <p className="text-secondary text-center text-sm">
                {errorsInput.category.msg}
              </p>
            )}
          </div>
          <div className="modal-action justify-center">
            <button
              onClick={submitCreateProduct}
              className={`btn btn-success btn-outline ${
                loadingCreateNewProduct ? "loading" : ""
              }`}
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ListPage;
