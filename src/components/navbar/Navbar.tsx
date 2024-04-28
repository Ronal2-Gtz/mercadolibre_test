import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

import "./navbar.scss";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      navigate(`/items?search=${event.currentTarget.value}`)
      event.currentTarget.blur();
    }
  };

  return (
    <div className="navbar">
      <img src={Logo} alt="logo" className="navbar__img" id="navbar__img" />
      <input
        onKeyDown={handleSearch}
        placeholder="Nunca dejes de buscar"
        type="text"
        className="navbar__input"
        id="navbar__input"
      />
    </div>
  );
};
