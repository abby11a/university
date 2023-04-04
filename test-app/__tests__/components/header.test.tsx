import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {Header} from "@/components/Header";
import client, { signOut } from "next-auth/react";
import { Session } from "next-auth";

jest.mock("next/router", () => ({
	push: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
	signOut: jest.fn(),
	signIn: jest.fn(),
	getSession: jest.fn(),
	getProviders: jest.fn(),
	useSession: jest.fn().mockReturnValue([{ user: { role: 'Admin' } }, false])
}));

describe("Header", () => {
	const originalWindow = window;
	afterEach(() => {
		jest.clearAllMocks();
		window = originalWindow;
	});

	beforeEach(()=>{
		const mockSession: Session = {
			expires: "1",
			user: { name: "John Doe", email: "john.doe@example.com", role: 'Admin' }
		  };
	  
		(client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
	})
	
	it("should render a header", () => {
		const { getByText } = render(
			<Header />);
		expect(getByText("Device List")).toBeInTheDocument();
		expect(getByText("Create Device")).toBeInTheDocument();
		expect(getByText("Sign Out")).toBeInTheDocument();
	});

	it("should sign out when the button is pressed", () => {
		render(<Header />);
		const signOutButton = screen.getByRole('button', { name: 'Sign Out' })
		fireEvent.click(signOutButton);
		expect(signOut).toHaveBeenCalledTimes(1);
	});

	it("should show the active link", () => {
		const { getByText } = render(
			<Header />);
		expect(getByText("Device List")).toHaveAttribute("data-active", "true");
		expect(getByText("Create Device")).toHaveAttribute("data-active", "false");
	});

	it("should show the active link when creating a device", () => {
		delete window.location;
		window.location = { pathname: "/create" };

		const { getByText } = render (
			<Header />
		);
		expect(getByText("Device List")).toHaveAttribute("data-active", "false");
		expect(getByText("Create Device")).toHaveAttribute("data-active", "true");
	});

	it("should go to create page when clicked", () => {
		const { getByText } = render(<Header />);
		const createButton = getByText("Create Device");

		fireEvent.click(createButton);
		expect(window.location.pathname).toEqual("/create")
	});
});
