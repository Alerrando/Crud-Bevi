export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  status: number;
  token: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface ProductReturn {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  status: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export type RegisterProductProps = Omit<ProductProps, "id" | "updated_at" | "created_at" | "deleted_at">;

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
