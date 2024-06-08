export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  status: number;
  token: string;
}

export type RegisterProductProps = Omit<ProductProps, "id">;

export async function registerProduct({
  name,
  description,
  price,
  stockQuantity,
  status,
  token,
}: RegisterProductProps) {
  const response = await fetch("http://34.71.240.100/api/product/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
      price,
      status,
      stock_quantity: stockQuantity,
    }),
  }).then((data) => data.json());

  return response.data;
}
