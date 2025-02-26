const fs = require('fs');

// Path to the JSON file
const filePath = 'aboutblank.json';

// Example: This will be replaced by real form submission data later
const newSubmission = {
    timestamp: new Date().toISOString(),
    "Order Number": "123456",
    "Brand": "About Blank",
    "Customer Name": "John Doe",
    "Customer Email": "john@example.com",
    "Order Date": "2025-02-26",
    "Shipping Address": "123 Main St, City, Country",
    "Product SKU": "AB-001",
    "Product Name": "T-Shirt",
    "Quantity Ordered": 2,
    "Reason for Return": "Wrong Size",
    "Additional Notes": "Customer wants to exchange for a larger size"
};

// Read the existing JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    let submissions = [];

    if (!err) {
        try {
            submissions = JSON.parse(data); // Parse existing data
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    // Append the new submission
    submissions.push(newSubmission);

    // Write back to the JSON file
    fs.writeFile(filePath, JSON.stringify(submissions, null, 4), 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("New submission added successfully!");
        }
    });
});
