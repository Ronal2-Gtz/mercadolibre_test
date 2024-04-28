import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../components/card/Card";
import { useGetProducts } from "../../services/products.service";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";

import "./products.scss";

export const Products = (): React.ReactElement => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search');

  const { data } = useGetProducts(search ?? '');
  
  return (
    <div className="products">
      <Breadcrumb categories={data?.categories ?? []}/>
      {data?.items?.map((product) => (
        <Fragment key={product.id}>
          <Card
            isShipping={product.free_shipping}
            id={product.id}
            title={product.title}
            price={product.price.amount}
            img={product.picture}
          />
          <hr />
        </Fragment>
      ))}
    </div>
  );
};
