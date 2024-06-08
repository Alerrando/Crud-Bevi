export type DeleteProductSuccess = {
  success: true;
  code: 200;
  message: string;
  data: {
    name: string;
    description: string;
    price: number;
    status: number;
    stock_quantity: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
};

export type DeleteProductProps = {
  id: number;
  token: string;
};

export async function deleteProduct({ id, token }: DeleteProductProps) {
  const response = await fetch("http://34.71.240.100/api/product/delete", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((data) => data.json());

  return response.data;
}
