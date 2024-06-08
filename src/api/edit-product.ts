import { ProductProps } from "./register-product";

export async function editProduct({ id, name, description, price, status, stockQuantity, token }: ProductProps) {
  const response = await fetch("http://34.71.240.100/api/product/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      name,
      description,
      price,
      status,
      stock_quantity: stockQuantity,
    }),
  }).then((data) => data.json());

  return response.data;
}
