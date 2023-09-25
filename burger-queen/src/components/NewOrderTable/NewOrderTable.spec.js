import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { products, postOrder } from "../../Services/Request";
import NewOrderTable from "./NewOrderTable";

jest.mock("../../Services/Request", () => ({
  products: jest.fn(),
  postOrder: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.spyOn(console, "error").mockImplementation(() => {});

const handleAddOrder = jest.fn();
const handleAddToSelectedItems = jest.fn();
const handleRemoveSelectedItems = jest.fn()

const productsMock = [
  {
    id: 1,
    name: "Sandwich",
    price: 10,
    type: "Breakfast",
  },
];

beforeEach(() => {
  products.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(productsMock),
  });
  localStorage.setItem("token", "mockedToken");
  localStorage.setItem("role", "Waiter/Waitress");
});

describe("NewOrderTable component", () => {
  let client, table, menu, btnMenu, order, btnAddMoreItem, btnRemoveItem;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NewOrderTable
          handleAddToSelectedItems={handleAddToSelectedItems()}
          handleRemoveSelectedItems={handleRemoveSelectedItems()}
          handleAddOrder={handleAddOrder}
        />
      </MemoryRouter>
    );
    client = screen.getByTestId("client_order");
    table = screen.getByTestId("table_order");
    btnMenu = screen.getByTestId("btn_breakfast");
  });

  it("should render the NewOrderTable component and have the menu available", async () => {
    fireEvent.click(btnMenu);
    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });
  });

  it("It should render the item in the order when it is selected from the menu and be able to increase its quantity", async () => {
    fireEvent.click(btnMenu);

    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnAddMoreItem = screen.getAllByTestId(/^add_item_/);
    });

    fireEvent.click(btnAddMoreItem[0]);
    expect(handleAddToSelectedItems).toHaveBeenCalled();
  });

  it("It should render the item in the order when it is selected from the menu and be able to increase its quantity", async () => {
    fireEvent.click(btnMenu);

    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnRemoveItem = screen.getAllByTestId(/^remove_item_/);
    });

    fireEvent.click(btnRemoveItem[0]);
    expect(handleRemoveSelectedItems).toHaveBeenCalled();
  });
});
