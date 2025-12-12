import type { CategoryDTO } from "@shared/types";
import React from "react";

interface CategorySelectProps {
  categories: CategoryDTO[];
  value: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  value,
  onChange,
  className,
}) => {
  return (
    <select
      id="categoryId"
      name="categoryId"
      multiple={true}
      onChange={onChange}
      value={value}
      className={className}
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      ))}
    </select>
  );
};
