import React from "react";

type BreadcrumbProps = {
  categories: Array<string>;
};

import './breadcrumb.scss'

export const Breadcrumb = ({
  categories,
}: BreadcrumbProps): React.ReactElement => {
  return (
    <ul className="breadcrumb">
      {categories.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  );
};
