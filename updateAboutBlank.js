const fs = require('fs');

// Path to the JSON file
const filePath = 'aboutblank.json';

// New submission data (replace with actual data later)
const newSubmission = {
    timestamp: new Date().toISOString(),
    field: "Example Field - About Blank",
    value: "Example Value"
};

// Read the existing JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    let submissions = [];
    try {
        submissions = JSON.parse(data);
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }

    // Add the new submission
    submissions.push(newSubmission);

    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(submissions, null, 4), 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("New submission added successfully!");
    });
});
