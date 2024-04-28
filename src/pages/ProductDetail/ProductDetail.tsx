import React from "react";
import { useParams } from "react-router-dom";
import { useGetProduct } from "../../services/products.service";

import "./productDetail.scss";

type ParamsProps = {
  id: string;
};

export const ProductDetail = ({}): React.ReactElement => {
  const { id } = useParams<ParamsProps>();
  const { data } = useGetProduct(id!);

  const handleBuy = (link: string) => {
    const url = new URL(link);
    window.open(url.href, "_blank");
  };

  return (
    <div className="product">
      <div className="product__info">
        <div className="product__detail">
          <div className="product__imgContainer">
            <img
              className="product__img"
              src={data?.picture}
              alt={data?.picture}
            />
          </div>
          <div className="product__priceInfo">
            <p className="product__condition">{`${data?.condition} - vendidos`}</p>
            <p className="product__titleProduct">{data?.title}</p>
            <p className="product__price">{data?.price.amount}</p>
            <button
              className="product__button"
              onClick={() => handleBuy(data?.url ?? "")}
            >
              Comprar
            </button>
          </div>
        </div>
        <h3 className="product__titleDescription">Descripción del producto</h3>
        <p className="product__description">{data?.description}</p>
      </div>
    </div>
  );
};
