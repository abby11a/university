import React from "react";
import { render } from "@testing-library/react";
import { TableHeader } from "@/components/TableHeader";

// Tests components/TableHeader file
describe("TableHeader", () => {
	it("should render the correct headings", () => {
		const { getByText } = render(
			<table>
				<TableHeader/>
			</table>
		);
		expect(getByText("ID")).toBeInTheDocument();
		expect(getByText("Make")).toBeInTheDocument();
		expect(getByText("Model")).toBeInTheDocument();
		expect(getByText("Chipset")).toBeInTheDocument();
		expect(getByText("Status")).toBeInTheDocument();
		expect(getByText("Availability")).toBeInTheDocument();
		expect(getByText("Location")).toBeInTheDocument();
		expect(getByText("Farm ID")).toBeInTheDocument();
	});
});
