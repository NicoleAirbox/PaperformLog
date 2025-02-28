async function updateSubmissions() {
    try {
        const submissions = await fetchPaperformSubmissions();

        if (!Array.isArray(submissions) || submissions.length === 0) {
            console.log("No new submissions found.");
            return;
        }

        console.log("Processed Submissions:", JSON.stringify(submissions, null, 2));

        //Comment out the below lines for now
        // let existingData = [];
        // if (fs.existsSync(JSON_FILE_PATH)) {
        //     try {
        //         const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf8');
        //         existingData = fileContent ? JSON.parse(fileContent) : [];
        //     } catch (parseError) {
        //         console.error("Error parsing existing JSON file:", parseError);
        //         existingData = []; // Reset to avoid issues with corrupted data
        //     }
        // }

        // Format new submissions and add them to existing data
        const formattedSubmissions = submissions.map(sub => ({
            timestamp: new Date(sub.created_at).toISOString(),
            "Brand": sub.data["6fj0"] || "",
            "Staff member": sub.data["dr256"] || "",
            "Supplier": sub.data["b9v5k"] ? sub.data["b9v5k"].join(", ") : "",
            "Receiving warehouse": sub.data["1rtbo"] || "",
            "Shipment type": sub.data["fhm94"] || "",
            "Haulier/Courier": sub.data["1esje"] || "",
            "Container type": sub.data["c6pk7"] || "",
            "Container unloading type": sub.data["c86sn"] || "",
            "Tracking": sub.data["8hkkn"] || "",
            "Movement reference number (MRN)": sub.data["b9cds"] || "",
            "MRN information": sub.data["9a5c6"] || "",
            "Domestic delivery": sub.data["f0fl1"] || "",
            "Date of shipment arrival": sub.data["uja6"] || "",
            "Date of product launch": sub.data["e5rvc"] || "",
            "Unit quantity": sub.data["ak901"] || "",
            "Carton quantity": sub.data["eqp6"] || "",
            "Pallet quantity": sub.data["8mh73"] || "",
            "Allocation type": sub.data["3msk2"] || "",
            "Mixed shipment": sub.data["birgd"] || "",
            "ASN ID number(s)": sub.data["9j3i"] || "",
            "Stock movement": sub.data["3hoed"] || "",
            "Prepacks ASN file": sub.data["6jgm8"] || "",
            "Packing list name": sub.data["5jpuh"] || "",
            "Outer labels": sub.data["ds09f"] || "",
            "Documents": sub.data["cmjej"] || "",
            "System status": sub.data["3t3v5"] || "",
            "Stock status": sub.data["71lbd"] || "",
            "Remedial work": sub.data["1jkii"] || "",
            "Remedial work details": sub.data["ahakt"] || "",
            "Remedial work files": sub.data["3ulpi"] || "",
            "Pre-order": sub.data["2o7g6"] || "",
            "Launch date of pre-order": sub.data["ck7di"] || "",
            "Launch time of pre-order": sub.data["ans55"] || "",
            "Pre-order SKUs": sub.data["5dmln"] || "",
            "Further comments": sub.data["dnuvk"] || "",
        }));

        //Change this line to only include the formatted submissions
        const updatedData = [...formattedSubmissions];

        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(updatedData, null, 2), 'utf8');
        console.log("New submission added successfully!");

    } catch (error) {
        console.error("Error in updateSubmissions:", error);
    }
}