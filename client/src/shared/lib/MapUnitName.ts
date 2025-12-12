interface ProductUnitInfo {
  base_unit_name: string;
  items_per_package: number;
  package_unit_name: string;
}
export const mapUnitName = (
  amount: string | number | undefined,
  product: ProductUnitInfo | null | undefined
) => {
  if (amount === "") return;
  const amountNumber = Number(amount);
  const itemsPerPackage = Number(product?.items_per_package);

  if (amountNumber % itemsPerPackage === 0) {
    const packages = amountNumber / itemsPerPackage;
    return `${packages} ${product?.package_unit_name}`;
  } else {
    return `${amountNumber} ${product?.base_unit_name}`;
  }
};
