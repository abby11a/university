import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";
import client, { signOut } from "next-auth/react";
import { Session } from "next-auth";
import router from "next/router";

// Mock the router
jest.mock('next/router', () => ({
	useRouter: jest.fn().mockResolvedValue({ pathname: "/" }),
	push: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
	signOut: jest.fn(),
	signIn: jest.fn(),
	getSession: jest.fn(),
	getProviders: jest.fn(),
	useSession: jest.fn().mockReturnValue([{ user: { role: 'Admin' } }, false])
}));

// Tests components/Header file
describe("Header", () => {
	beforeEach(() => {
		const mockSession: Session = {
			expires: "1",
			user: { name: "John Doe", email: "john.doe@example.com", role: 'Admin' }
		};
		(client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
	})

	it("should render a header", () => {
		const { getByText } = render(<Header />);
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

	it("should show the active link when creating a device", () => {
		jest.clearAllMocks()
		// Mock the router to be at create 
		jest.mock('next/router', () => ({
			useRouter: jest.fn().mockResolvedValue({ pathname: "/create" })
		}))
		render(<Header/>);
		expect(screen.getByText("Device List")).toHaveAttribute("data-active", "false");
	});

	it("should go to create page when clicked", () => {
		render(<Header />);
		const createButton = screen.getByRole('button', { name: "Create Device" });

		fireEvent.click(createButton);
		expect(router.push).toBeCalledWith("/create")
	});
});
