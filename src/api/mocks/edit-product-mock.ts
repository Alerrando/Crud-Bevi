import { HttpResponse, http } from "msw";
import { productsData } from ".";
import { ProductReturn } from "../register-product";

export const editProductMock = http.put<never, ProductReturn>(
  "http://34.71.240.100/api/product/update",
  async ({ request }) => {
    const { id, name, description, price, status, stock_quantity: stockQuantity } = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer", "");

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
        deleted_at: null,
      });

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "Produto editado com sucesso.",
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

    return HttpResponse.error();
  },
);
