/** 
    The head component for the tables, which is the variables listed in the correct order. 
    Written as a seperate file for modulisation and reusability.
**/
export const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Chipset</th>
                <th>Status</th>
                <th>Availability</th>
                <th>Location</th>
                <th>Farm ID</th>
            </tr>
        </thead>
    )
}
