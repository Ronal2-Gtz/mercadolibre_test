import { Link } from "react-router-dom";
import shippingImage from "../../assets/ic_shipping.png";

import "./card.scss";

type CardProps = {
  img: string;
  price: string;
  title: string;
  id: string;
  isShipping: boolean;
};

export const Card = ({
  img,
  price,
  title,
  id,
  isShipping,
}: CardProps): React.ReactElement => {
  return (
    <Link to={`/items/${id}`}>
      <div className="card">
        <img src={img} alt={img} className="card__img" />
        <div className="card__details">
          <div className="card__priceContainer">
            <p className="card__price">{price}</p>
            {isShipping && <img src={shippingImage} alt="logo isShipping" className="card__img--shipping" />}
          </div>
          <p className="card__title">{title}</p>
        </div>
      </div>
    </Link>
  );
};
