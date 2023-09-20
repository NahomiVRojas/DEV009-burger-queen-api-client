import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

// eslint-disable-next-line no-undef
global.Request = jest.fn();

jest.mock("../../Services/Request", () => ({
  auth: jest.fn(),
}));

describe("LoginForm", () => {
  it("should handle user authentication", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        accessToken: "token123",
        user: { role: "admin", name: "Admin" },
      }),
    };

    const authMock = require("../../Services/Request").auth;
    authMock.mockResolvedValue(mockResponse);

    const emailElement = screen.getByTestId("email_login");
    const passwordElement = screen.getByTestId("password_login");
    const buttonElement = screen.getByTestId("submit_login");

    const emailChange = { target: { value: "admin@bq.com" } };
    const passwordChange = { target: { value: "123456" } };

    fireEvent.change(emailElement, emailChange);
    fireEvent.change(passwordElement, passwordChange);

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(authMock).toHaveBeenCalledWith("admin@bq.com", "123456");
    });
  });
});
