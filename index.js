
const core = require('@actions/core');
//const fs = require('fs');
const { updateFieldsInFile } = require('./src/utils')

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
//const versionCodeRegexPattern = /(versionCode(?:\s|=)*)(.*)/;
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
////const versionNameRegexPattern = /(versionName(?:\s|=)*)(.*)/;

try {
    const supportedFields = ['gradlePath', 'versionCode', 'versionName', 'applicationId', 'minSdkVersion', 'targetSdkVersion']
    const gradlePath = core.getInput('gradlePath');
    //const versionCode = core.getInput('versionCode');
    //const versionName = core.getInput('versionName');
    //console.log(`Gradle Path : ${gradlePath}`);
    //console.log(`Version Code : ${versionCode}`);
    //console.log(`Version Name : ${versionName}`);
    updateFieldsInFile(gradlePath, supportedFields)
    //fs.readFile(gradlePath, 'utf8', function (err, data) {
    //    newGradle = data;
    //    if (versionCode.length > 0)
    //        newGradle = replaceValue(newGradle, versionCodeRegexPattern, versionCode);
    //    if (versionName.length > 0)
    //        newGradle = replaceValue(newGradle, versionNameRegexPattern, versionName);
    //    fs.writeFile(gradlePath, newGradle, function (err) {
    //        if (err) throw err;
    //        if (versionCode.length > 0)
    //            console.log(`Successfully override version code ${versionCode}`)
    //        if (versionName.length > 0)
    //            console.log(`Successfully override version code ${versionName}`)
    //        core.setOutput("result", `Done`);
    //    });
    //});

} catch (error) {
    core.setFailed(error.message);
}