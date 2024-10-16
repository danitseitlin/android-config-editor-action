const core = require('@actions/core');
const { updateFieldsInFile } = require('./src/utils')

try {
    const supportedFields = ['gradlePath', 'versionCode', 'versionName', 'applicationId', 'minSdkVersion', 'targetSdkVersion']
    const gradlePath = core.getInput('gradlePath');
    const debug = core.getInput('debug') ?? false;
    updateFieldsInFile(gradlePath, supportedFields, debug)
} catch (error) {
    core.setFailed(error.message);
}