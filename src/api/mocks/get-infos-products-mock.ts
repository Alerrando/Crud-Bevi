import { HttpResponse, http } from "msw";
import { productsData } from ".";
import { GetInfosProductsProps } from "../get-infos-products";

export const getInfosProductsMock = http.post<never, GetInfosProductsProps>(
  "http://34.71.240.100/api/product/list",
  async ({ request }) => {
    const token = request.headers.get("Authorization")?.replace("Bearer", "");
    if (token?.trim() === "fake_access_token") {
      return HttpResponse.json({
        success: true,
        code: 200,
        message: "Produto(s) listado(s) com sucesso.",
        data: productsData.map((product) => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            status: product.status,
            stock_quantity: product.stock_quantity,
            updated_at: product.updated_at,
            created_at: product.created_at,
          };
        }),
      });
    }

    return new HttpResponse(
      `{   
        "success": false,
        "code": 422,
        "message": "Não há produtos a serem listados." 
       }`,
      { status: 422 },
    );
  },
);

export const getInfosProductsErrorMock = http.post<never, GetInfosProductsProps>(
  "http://34.71.240.100/api/product/list",
  async () => {
    return new HttpResponse(
      `{   
        "success": false,
        "code": 422,
        "message": "Não há produtos a serem listados." 
       }`,
      { status: 422 },
    );
  },
);
