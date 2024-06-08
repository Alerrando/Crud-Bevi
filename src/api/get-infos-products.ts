export interface GetInfosProductsProps {
  token: string;
}

export interface DataListProductsResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  status: number;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface GetInfosProductsListSuccessResponse {
  success: boolean;
  code: number;
  message: string;
  data: DataListProductsResponse[];
}

export async function getInfosProducts(token: string) {
  const response = await fetch("http://34.71.240.100/api/product/list", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => error);

  return response;
}
