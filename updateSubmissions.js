const fs = require("fs");
const path = require("path");

// Path to submissions.json
const filePath = path.join(__dirname, "submissions.json");

// Function to add a new submission
function addSubmission(newData) {
    // Read the current data
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        let submissions = [];
        try {
            submissions = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }

        // Add the new data
        submissions.push(newData);

        // Write the updated data back
        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log("New submission added successfully!");
            }
        });
    });
}

// Example usage (replace this with real data)
const newSubmission = {
    timestamp: new Date().toISOString(),
    field: "Example Field",
    value: "Example Value"
};

addSubmission(newSubmission);
