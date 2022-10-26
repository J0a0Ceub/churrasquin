import { FC } from "react";
import { handleDeleteProduct, handleEditProduct } from "../api";
import { editList } from "../redux/reducers/list";
import { useAppDispatch } from "../redux/store";
import { IList, IProduct } from "../types";
import ProductCard from "./ProductCard";
import { ReactComponent as Empty } from "../assets/empty.svg";

export type ProductListProps = {
  listId?: string;
  productList?: IProduct[];
  onSubmitList: (listId: string, update: IList) => Promise<boolean>;
};

const ProductList: FC<ProductListProps> = ({ listId, productList }) => {
  const dispatch = useAppDispatch();

  const submitEditProduct = async (product: IProduct) => {
    let result = false;
    if (listId && product) {
      let res = await handleEditProduct(listId, product._id, product);
      result = res.status === 200;
      dispatch(editList(res.data.list));
    }
    return result;
  };

  const submitDeleteProduct = async (id: string) => {
    let result = false;
    if (listId && id) {
      let res = await handleDeleteProduct(listId, id);
      result = res.status === 200;
      dispatch(editList(res.data.list));
    }
    return result;
  };

  if (!productList || productList.length === 0) {
    return (
      <div className="w-full">
        <p className=" text-center font-semibold text-xl">
          sua lista não tem nenhum item!!
        </p>
        <div className="w-auto flex-1 flex justify-center mt-5">
          <Empty />
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto">
      <h3 className="text-lg font-semibold">Items para o Churras</h3>
      {productList.map((product) => (
        <ProductCard
          onDeleteSubmit={submitDeleteProduct}
          onEditSubmit={submitEditProduct}
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
