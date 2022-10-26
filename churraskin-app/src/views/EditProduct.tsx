import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { RootState } from "../redux/store";

const ProductEdit: FC = () => {
  const { productId, listId } = useParams();
  const navigate = useNavigate();
  const { list } = useSelector((state: RootState) => state);

  const product = list.data
    .find((i) => i._id === listId)
    ?.data.find((p) => p._id === productId);

  return (
    <Wrapper>
      <div className="p-2">
        <div className="flex-1">
          <button
            className="btn btn-info btn-outline btn-xs"
            onClick={() => navigate(-1)}
          >
            voltar
          </button>
        </div>
        <div className="container p-1">
          <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductEdit;
