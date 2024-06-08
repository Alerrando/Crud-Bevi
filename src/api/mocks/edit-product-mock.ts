import { HttpResponse, http } from "msw";
import { productsData } from ".";
import { ProductProps } from "../register-product";

export const editProductMock = http.put<never, ProductProps>(
  "http://34.71.240.100/api/product/update",
  async ({ request }) => {
    const { id, name, description, price, status, stock_quantity: stockQuantity } = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer", "");

    console.log(id, name, description, price, status, stockQuantity, token);
    if (
      token?.trim() === "fake_access_token" &&
      name === "Produto10" &&
      description === "Descrição do produto 10" &&
      price === 22 &&
      status === 3 &&
      stockQuantity === 88
    ) {
      productsData.splice(id, 1);
      productsData.push({
        id,
        name,
        description,
        price,
        status,
        stock_quantity: stockQuantity,
        updated_at: "2024-04-10T14:46:24.000000Z",
        created_at: "2024-04-10T14:46:24.000000Z",
      });

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "Produto criado com sucesso.",
        data: {
          name,
          description,
          price,
          status,
          stock_quantity: stockQuantity,
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