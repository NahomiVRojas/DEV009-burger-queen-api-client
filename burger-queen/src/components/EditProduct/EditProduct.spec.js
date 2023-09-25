import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { editProduct } from "../../Services/Request";
import EditProduct from "./EditProduct";
jest.mock("../../Services/Request", () => ({
  editProduct: jest.fn(),
}));

jest.spyOn(console, "error").mockImplementation(() => {});

describe("AddProduct Component", () => {
  let idElement, nameElement, menuElement, priceElement, buttonElement;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <EditProduct
          onClose={() => {}}
          token="token123"
          id="product123"
          onEditSuccess={() => {}}
        />
      </MemoryRouter>
    );
    idElement = screen.getByTestId("id_edit_product");
    nameElement = screen.getByTestId("name_edit_product");
    menuElement = screen.getByTestId("menu_edit_product");
    priceElement = screen.getByTestId("price_edit_product");
    buttonElement = screen.getByTestId("btn_modal");
  });

  it("should add a new product", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        id: "product123",
        name: "Product",
        type: "Breakfast",
        price: "9.99",
      }),
    };

    editProduct.mockResolvedValueOnce(mockResponse);
    fireEvent.change(idElement, { target: { value: "product123" } });
    fireEvent.change(nameElement, { target: { value: "New Product" } });
    fireEvent.change(menuElement, { target: { value: "Breakfast" } });
    fireEvent.change(priceElement, { target: { value: "9.99" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(editProduct).toHaveBeenCalledWith(
        "product123",
        {
          id: "product123",
          name: "New Product",
          price: "9.99",
          type: "Breakfast",
        },
        "token123"
      );
    });
  });

  it("should handle error when adding a product with duplicate ID", async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({
        error: "Error al realizar la solicitud de edición",
      }),
    };

    editProduct.mockResolvedValueOnce(mockResponse);
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled()
    });
  });
});
