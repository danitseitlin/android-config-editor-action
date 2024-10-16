const core = require('@actions/core');
const fs = require('fs');

function replaceValueInText(data, fieldName, value, debug=false) {
    const regexPattern = new RegExp(`(${fieldName}(?:\s|=)*)(.*)`)
    const values = data.match(regexPattern)
    if(debug && values?.length > 0) {
        console.log(`Found current value: ${values[0]}`)
    }
    
    const replaceValue = typeof value === 'string' ? `${fieldName} \"${value}\"`: `${fieldName} ${value}`
    data = data.replace(regexPattern, replaceValue);
    return data;
}

function updateFieldsInFile(gradlePath, fields, debug=false) {
    fs.readFile(gradlePath, 'utf8', function (err, data) {
        newGradle = data;
        fields.forEach(function (fieldName) {
            const fieldValue = core.getInput(fieldName);
            if(fieldValue.length > 0) {
                if(debug) {
                    console.log(`Updating field ${fieldName} to ${fieldValue}`)
                }
                newGradle = replaceValueInText(newGradle, fieldName, fieldValue);
            }
        })
        fs.writeFile(gradlePath, newGradle, function (err) {
            if (err) throw err;
            core.setOutput("result", `Done`);
        });
    });
}

module.exports = {
    replaceValueInText: replaceValueInText,
    updateFieldsInFile: updateFieldsInFile,
};