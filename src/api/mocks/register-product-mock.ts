import { HttpResponse, http } from "msw";
import { productsData } from ".";
import { RegisterProductProps } from "../register-product";

export const registerProductMock = http.post<never, RegisterProductProps>(
  "http://34.71.240.100/api/product/create",
  async ({ request }) => {
    const { name, description, price, status, stock_quantity: stockQuantity } = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer", "");

    if (
      token?.trim() === "fake_access_token" &&
      name === "Produto7" &&
      description === "Descrição do produto 7" &&
      price === 50 &&
      status === 1 &&
      stockQuantity === 50
    ) {
      productsData.push({
        id: 4,
        name,
        description,
        price,
        status,
        stock_quantity: stockQuantity,
        updated_at: "2024-04-10T14:46:24.000000Z",
        created_at: "2024-04-10T14:46:24.000000Z",
        deleted_at: null,
      });

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "Produto criado com sucesso.",
        data: {
          name: "Produto 7",
          description: "Descrição Produto 1",
          price: 50,
          status: 1,
          stock_quantity: 50,
          updated_at: "2024-04-10T14:46:24.000000Z",
          created_at: "2024-04-10T14:46:24.000000Z",
          id: 1,
        },
      });
    }

    return new HttpResponse(
      `{
        "success": false,
        "message": "Os dados fornecidos são inválidos.",
        "code": 422,
        "data": [],
        "errors": []
       }`,
      { status: 422 },
    );
  },
);