import React, { useState } from "react";
import Layout from "./Layout";
import Device, { DeviceProps } from "./Device";
import { TableHeader } from "@/components/TableHeader";
import styles from "../styles/device.module.css";
import { Props } from "@/pages";

// Options to filter the device table with
const filterOptions = [
	{ value: "", label: "All" },
	{ value: "id", label: "ID" },
	{ value: "make", label: "Make" },
	{ value: "model", label: "Model" },
	{ value: "chipset", label: "Chipset" },
	{ value: "status", label: "Status" },
	{ value: "availability", label: "Availability" },
	{ value: "location", label: "Location" },
	{ value: "farmId", label: "Farm ID" },
];

/** Function that returns table of devices */
const devicesTable = (props: Props) => {
	if (!props.devices) {
		console.log(props);
		return <div>No Devices Listed</div>;
	} else {
		return (
			<table className={styles.table}>
				<TableHeader />
				<tbody>
					{props.devices.map((device) => {
						return <Device key={device.id} device={device} />;
					})}
				</tbody>
			</table>
		);
	}
};

/** Returns a table of devices with a search bar */
const Home: React.FC<Props> = (props: Props) => {
	const [search, setSearch] = useState("");
	const [filterFeature, setFilterFeature] = useState("");

  	// Returns list of filtered devices, regardless of case and type
	const filteredDevices = props.devices.filter((item: DeviceProps) => {
		if (!filterFeature) {
			return Object.values(item).some((value) => value ? value.toString().toLowerCase().includes(search.toLowerCase()): false);
		} else {
			return (item as any)[filterFeature].toString().toLowerCase().includes(search.toLowerCase())};
	});

	return (
		<Layout>
			<div>
				<h1 className={styles.heading}>Devices</h1>
				<main className={styles.devices}>
					<div className={styles.filter}>
						<select
							id="filter"
							value={filterFeature}
							onChange={(e) => setFilterFeature(e.target.value)}
						>
							{filterOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<input
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					{devicesTable({ devices: filteredDevices, farms: props.farms })}
				</main>
			</div>
		</Layout>
	);
};

export default Home;
