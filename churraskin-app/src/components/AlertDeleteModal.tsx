import { FC } from "react";
type AlertDeleteModalProps = {
  productName?: string;
};
const AlertDeleteModal: FC<AlertDeleteModalProps> = ({ productName }) => {
  return (
    <div className="modal" id="modal-delete-product">
      <div className="modal-box relative">
        <label
          htmlFor="modal-delete-product"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>

        <h3 className="text-lg font-bold">Excluir {productName}?</h3>
      </div>
    </div>
  );
};

export default AlertDeleteModal;
