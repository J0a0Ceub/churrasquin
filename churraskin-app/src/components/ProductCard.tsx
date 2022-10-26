import { FC, MouseEventHandler, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CategoryTypes, IProduct } from "../types";

type ProductCardProps = {
  product: IProduct;
  onEditSubmit: (product: IProduct) => Promise<boolean>;
  onDeleteSubmit: (productId: string) => Promise<boolean>;
};

const ProductCard: FC<ProductCardProps> = ({
  product,
  onDeleteSubmit,
  onEditSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingdelete] = useState(false);
  const [auxProduct, setAuxProduct] = useState<IProduct>(product);

  const handleEditProduct: MouseEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res = await onEditSubmit(auxProduct);
    setLoading(false);
    if (res) {
      let a = document.getElementById("backLink") as HTMLAnchorElement;
      a.href = "#";
      a.click();
    }
  };

  const handleDeleteProduct: MouseEventHandler = async () => {
    if (window.confirm(`Excluir ${product.name}?`)) {
      setLoadingdelete(true);
      let res = await onDeleteSubmit(product._id);

      if (res) {
        let a = document.getElementById("backLink") as HTMLAnchorElement;
        if (a) {
          a.href = "#";
          a.click();
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="card card-compact w-auto mx-1 bg-base-200 my-1">
      <div className="card-body">
        <div className="w-full items-center inline-flex">
          <h3 className="card-title flex-1 text-left font-bold text-xl">
            {product.name}
          </h3>
          <div className="menu p-2">
            <a href={`#product-modal-${product._id}`}>
              <BiEdit fontSize={18} />
            </a>
            <div className="modal" id={`product-modal-${product._id}`}>
              <div className="modal-box relative">
                <a
                  id="backLink"
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
                    id={`product-${product._id}-input-name`}
                    className="input input-bordered w-full max-w-xs"
                    value={auxProduct.name}
                    onChange={(e) =>
                      setAuxProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Quantidade</span>
                  </label>
                  <input
                    id={`product-${product._id}-input-quantity`}
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    value={auxProduct.quantity}
                    min={0}
                    onChange={(e) =>
                      setAuxProduct((prev) => ({
                        ...prev,
                        quantity: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Categoria</span>
                  </label>
                  <select
                    className="select select-bordered"
                    id={`product-${product._id}-input-category`}
                    value={auxProduct.category}
                    onChange={(e) =>
                      setAuxProduct((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    {CategoryTypes.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-action">
                  <button
                    className={`btn btn-outline btn-error btn-sm ${
                      loadingDelete ? "loading" : ""
                    }`}
                    onClick={handleDeleteProduct}
                  >
                    Excluir
                  </button>
                  <button
                    className={`btn btn-outline btn-success btn-sm ${
                      loading ? "loading" : ""
                    }`}
                    onClick={handleEditProduct}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full items-center inline-flex">
          <p className="flex-1 text-left">Quantidade: {product.quantity}</p>
          <div className="badge badge-info">{product.category}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
