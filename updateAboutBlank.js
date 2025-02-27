const fs = require('fs');
const axios = require('axios');

// Replace with your actual Paperform API Key and Form ID
const PAPERFORM_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYjc1N2Q0Zjk0MjZiYzBjYjlmMjJmODE2NTg0MmU1NzRjOTk3YmEzYzE2YzJjZGU3OWI0MmVhMTU4NDAwNjA0NTU3M2Y2YWFkMDhmMzMyYjYiLCJpYXQiOjE3NDA2MTYxODMuMDMzNDUsIm5iZiI6MTc0MDYxNjE4My4wMzM0NTIsImV4cCI6NDg5NjI4OTc4My4wMjgyMjgsInN1YiI6IjM5NDc4NyIsInNjb3BlcyI6W119.c8JP8-Sb7xB6adO9zHPBfpUQdysS9-dfPOySXKAi8bASuuu39LW5vhf3yQa9koqX6MRrZFJR0rJDrVzSGoOq5vVgmnel7vd0Tmy8ODsb1wqs4FhXV8XyvbZPX0TXnAUwCO0GtZ9VNHFMc3TtM3ZRo-8B2nTSsmTPuH6_QS2_PVF5gddlL4g7oUY2r6h_3XA7HtMY-i-NN35lFf7gWDqTiIhGwLu34UFI0E_kvttBYEU9A9-LyN3aBAXBd1FL3ZbzAJXsnZhH-7XfrIaMAGVwLuE_96Kq357jmNJ6MkO27R36_uYZJMuSA_WG8ZbV6KTbJYU8AH0x0lImzP7d6quvg7EXtZk1jck4OzFIE5_KKiNnLElWgEEZvY7QBeXST30tZUOWP9a91Kb4NsUkrTsZHJzyscvSzDyfa-F0H7_L62c4k97kyhIPpAzm1Rna4Rgjxd9Ji_ozQ63yNd9TLbUyp0QsScvpCLF4yRMlzAHl5tlsETDW8V94cSAOxay3x-XfEpEpIYyL95QQFY1XPuG5PbpPg9zq7uzIZGqvSFV8PPE1wqkTXn478AVcatZGwNY0guWQZBYsf_BIITPCrcIF4N3cEFEH4JFzUcqhxeuJFp1AwZvw5BcFIoWshtgdCBNslyrHB8-EG47ld0VJcCzrNVU3P-V2-PpQ_7t60BFVxII';
const FORM_ID = 'aboutblank';
const JSON_FILE_PATH = 'aboutblank.json';

// Function to fetch latest submissions from Paperform
async function fetchPaperformSubmissions() {
    try {
        const response = await axios.get(`https://api.paperform.co/v1/forms/${FORM_ID}/submissions`, {
            headers: {
                Authorization: `Bearer ${PAPERFORM_API_KEY}`,
            },
        });

        console.log("Raw API Response:", JSON.stringify(response.data, null, 2));

        // Ensure the response structure is correct
        if (!response.data.results || !response.data.results.submissions) {
            console.error("Unexpected API response structure:", response.data);
            return [];
        }

        return response.data.results.submissions; // Extract actual submissions
    } catch (error) {
        console.error('Error fetching data from Paperform:', error.message);
        return [];
    }
}

// Function to update JSON file
async function updateSubmissions() {
    const submissions = await fetchPaperformSubmissions();

    if (!Array.isArray(submissions) || submissions.length === 0) {
        console.log("No new submissions found.");
        return;
    }

    console.log("Processed Submissions:", JSON.stringify(submissions, null, 2));

    // Read existing JSON file (if exists)
    let existingData = [];
    if (fs.existsSync(JSON_FILE_PATH)) {
        const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf8');
        existingData = fileContent ? JSON.parse(fileContent) : [];
    }

    // Format new submissions and add them to existing data
    const formattedSubmissions = submissions.map(sub => ({
        timestamp: new Date(sub.created_at_utc).toISOString(),
        "Brand": sub.data["Brand"] || "N/A",
        "Staff member": sub.data["Staff member"] || "N/A",
        "Supplier": sub.data["Supplier"] || "N/A",
        "Receiving warehouse": sub.data["Receiving warehouse"] || "N/A",
        "Shipment type": sub.data["Shipment type"] || "N/A",
        "Haulier/Courier": sub.data["Haulier/Courier"] || "N/A",
        "Container type": sub.data["Container type"] || "N/A",
        "Container unloading type": sub.data["Container unloading type"] || "N/A",
        "Tracking": sub.data["Tracking"] || "N/A",
        "Movement reference number (MRN)": sub.data["Movement reference number (MRN)"] || "N/A",
        "MRN information": sub.data["MRN information"] || "N/A",
        "Domestic delivery": sub.data["Domestic delivery"] || "N/A",
        "Date of shipment arrival": sub.data["Date of shipment arrival"] || "N/A",
        "Date of product launch": sub.data["Date of product launch"] || "N/A",
        "Unit quantity": sub.data["Unit quantity"] || "N/A",
        "Carton quantity": sub.data["Carton quantity"] || "N/A",
        "Pallet quantity": sub.data["Pallet quantity"] || "N/A",
        "Allocation type": sub.data["Allocation type"] || "N/A",
        "Mixed shipment": sub.data["Mixed shipment"] || "N/A",
        "ASN ID number(s)": sub.data["ASN ID number(s)"] || "N/A",
        "Stock movement": sub.data["Stock movement"] || "N/A",
        "Prepacks ASN file": sub.data["Prepacks ASN file"] || "N/A",
        "Packing list name": sub.data["Packing list name"] || "N/A",
        "Outer labels": sub.data["Outer labels"] || "N/A",
        "Documents": sub.data["Documents"] || "N/A",
        "System status": sub.data["System status"] || "N/A",
        "Stock status": sub.data["Stock status"] || "N/A",
        "Remedial work": sub.data["Remedial work"] || "N/A",
        "Remedial work details": sub.data["Remedial work details"] || "N/A",
        "Remedial work files": sub.data["Remedial work files"] || "N/A",
        "Pre-order": sub.data["Pre-order"] || "N/A",
        "Launch date of pre-order": sub.data["Launch date of pre-order"] || "N/A",
        "Launch time of pre-order": sub.data["Launch time of pre-order"] || "N/A",
        "Pre-order SKUs": sub.data["Pre-order SKUs"] || "N/A",
        "Further comments": sub.data["Further comments"] || "N/A",
    }));

    // Merge new submissions with existing ones
    const updatedData = [...existingData, ...formattedSubmissions];

    // Save updated data back to JSON file
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log("New submission added successfully!");
}

// Run the update process
updateSubmissions();
