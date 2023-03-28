import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { signOut } from "next-auth/react";

jest.mock('next-auth/react', () => ({
	signOut: jest.fn()
}))

describe("Header", () => {
	const originalWindow = window;
	afterEach(() => {
		jest.clearAllMocks();
		window = originalWindow;
	});

	it("should render a header", () => {
		const { getByText } = render(<Header />);
		expect(getByText("Device List")).toBeInTheDocument();
		expect(getByText("+ Create device")).toBeInTheDocument();
		expect(getByText("Sign Out")).toBeInTheDocument();
	});

	it("should sign out when the button is pressed", () => {
		render(<Header />);
		const signOutButton = screen.getByRole('button', {name: 'Sign Out'})
		fireEvent.click(signOutButton);
		expect(signOut).toHaveBeenCalledTimes(1);
	});

	it("should show the active link", () => {
		const { getByText } = render(<Header />);
		expect(getByText("Device List")).toHaveAttribute("data-active", "true");
		expect(getByText("+ Create device")).toHaveAttribute("data-active", "false");
	});

	it("should show the active link when creating a device", () => {
		delete window.location;
		window.location = { pathname: "/create" };

		const { getByText } = render(<Header />);
		expect(getByText("Device List")).toHaveAttribute("data-active", "false");
		expect(getByText("+ Create device")).toHaveAttribute("data-active", "true");
	});
});
