import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { addUsers } from "../../Services/Request";
import AddUser from "./AddUser";

jest.mock("../../Services/Request", () => ({
  addUsers: jest.fn(),
}));

jest.spyOn(console, "error").mockImplementation(() => {});

describe("AddUser Component", () => {
  let idElement,
    nameElement,
    emailElement,
    passwordElement,
    roleElement,
    buttonElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <AddUser onClose={() => {}} token="token123" onAdd={() => {}} />
      </MemoryRouter>
    );

    addUsers.mockClear();

    idElement = screen.getByTestId("id_user");
    nameElement = screen.getByTestId("name_user");
    emailElement = screen.getByTestId("email_user");
    passwordElement = screen.getByTestId("password_user");
    roleElement = screen.getByTestId("role_user");
    buttonElement = screen.getByTestId("btn_modal");
  });

  it("should add a new user", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        id: "2",
        name: "Juan Jose",
        email: "juanjo@bq.com",
        password: "123456",
        role: "Admin",
      }),
    };

    addUsers.mockResolvedValueOnce(mockResponse);

    fireEvent.change(idElement, { target: { value: "2" } });
    fireEvent.change(nameElement, { target: { value: "Juan Jose" } });
    fireEvent.change(emailElement, { target: { value: "juanjo@bq.com" } });
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    fireEvent.change(roleElement, { target: { value: "Admin" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(addUsers).toHaveBeenCalledWith(
        {
          id: "2",
          name: "Juan Jose",
          email: "juanjo@bq.com",
          password: "123456",
          role: "Admin",
        },
        "token123"
      );
    });
  });

  it("should add a new user", async () => {
    const mockResponse = {
      ok: true,
      status: 400,
    };

    addUsers.mockResolvedValueOnce(mockResponse);
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(addUsers).toHaveBeenCalledTimes(1);
      const errorElement = screen.queryByTestId("error_message");
      expect(errorElement.textContent).toBe(
        "This email is already in use, or it's invalid."
      );
    });
  });

  it("should add a new user", async () => {
    const mockResponse = {
      ok: true,
      status: 500,
    };

    addUsers.mockResolvedValueOnce(mockResponse);
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(addUsers).toHaveBeenCalledTimes(1);
      const errorElement = screen.queryByTestId("error_message");
      expect(errorElement.textContent).toBe(
        "ID already in use."
      );
    });
  });

  it("should handle error when adding a user with an invalid email", async () => {
    const mockResponse = {
      ok: false,
      json: jest
        .fn()
        .mockResolvedValue({
          error: "An error occurred while adding the user.",
        }),
    };

    addUsers.mockRejectedValueOnce(mockResponse);

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(addUsers).toHaveBeenCalledTimes(1);
      const errorElement = screen.queryByTestId("error_message");
      expect(errorElement.textContent).toBe(
        "An error occurred while adding the user."
      );
    });
  });
});
