const core = require('@actions/core');
const fs = require('fs');

function getFieldValue(data, fieldName) {
    const regexPattern = new RegExp(`(${fieldName}(?:\s|=)*)(.*)`)
    const values = data.match(regexPattern)
    return values?.length > 0 ? values[0]: null
}

function getFieldDataForReplace(name, value) {
    return typeof value === 'string' ? `${name} \"${value}\"`: `${name} ${value}`
}

function replaceValueInText(data, fieldName, value) {
    const regexPattern = new RegExp(`(${fieldName}(?:\s|=)*)(.*)`)
    const replaceValue = getFieldDataForReplace(fieldName, value)
    data = data.replace(regexPattern, replaceValue);
    return data;
}

function updateFieldsInFile(gradlePath, fields, debug=false) {
    fs.readFile(gradlePath, 'utf8', function (err, data) {
        let updatedGradle = data;
        fields.forEach(function (fieldData) {
            const { name, type } = fieldData;
            const fieldValue = core.getInput(name);
            if(fieldValue.length > 0) {
                const parsedFieldValue = type === 'number' ? parseInt(fieldValue): fieldValue.toString();
                const currentFieldValue = getFieldValue(updatedGradle, name)
                if(debug) {
                    console.log(`Updating field ${name} from ${currentFieldValue} to ${parsedFieldValue} (new data => ${getFieldDataForReplace(name, parsedFieldValue)})`)
                }
                
                updatedGradle = replaceValueInText(updatedGradle, name, parsedFieldValue);
            }
        })
        fs.writeFile(gradlePath, updatedGradle, function (err) {
            if (err) throw err;
            core.setOutput("result", `Done`);
        });
    });
}

module.exports = {
    replaceValueInText: replaceValueInText,
    updateFieldsInFile: updateFieldsInFile,
};