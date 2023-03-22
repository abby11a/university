import React from "react";
import { DeviceProps } from "@/components/Device";

interface Props {
    deviceValues: DeviceProps;
    onSubmit: (values: DeviceProps) => void;
    idUnvailable: boolean; // Stop people editing unique ID
}

// Form for creating and editing devices
const Form: React.FC<Props> = ({ deviceValues, onSubmit, idUnvailable }) => {
    const [device, setDevice] = React.useState<DeviceProps>(deviceValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(device);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDevice({ ...device, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
          <label>ID</label>
          <input
            name="id"
            disabled={idUnvailable}
            autoFocus
            onChange={(e) => handleChange(e)}
            placeholder="Id"
            type="text"
            value={device.id}
          />
          <label>Make</label>
          <input
            name="make"
            onChange={(e) => handleChange(e)}
            placeholder="Make"
            type="text"
            value={device.make}
          />
          <label>Model</label>
          <input
            name="model"
            onChange={(e) => handleChange(e)}
            placeholder="Model"
            type="text"
            value={device.model}
          />
          <label>Status</label>
          <input
            name="status"
            onChange={(e) => handleChange(e)}
            placeholder="Status"
            type="text"
            value={device.status}
          />
          <label>Chipset</label>
          <input
            name="chipset"
            onChange={(e) => handleChange(e)}
            placeholder="Chipset"
            type="text"
            value={device.chipset}
          />
          <label>Location</label>
          <input
            name="location"
            onChange={(e) => setDevice({ ...device, location: e.target.value })}
            placeholder="Location"
            type="text"
            value={device.location}
          />
          <input
            disabled={!device.id || !device.make || !device.model || !device.status}
            type="submit"
            value="Create"
          />
        </form>
    );
};

export default Form;