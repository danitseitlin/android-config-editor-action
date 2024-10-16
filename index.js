const core = require('@actions/core');
const { updateFieldsInFile } = require('./src/utils')

try {
    const supportedFields = [
        { name: 'applicationId', type: 'string' },
        { name: 'versionName', type: 'string' },
        { name: 'versionCode', type: 'number' },
        { name: 'minSdkVersion', type: 'number' },
        { name: 'targetSdkVersion', type: 'number' }
    ]
    const gradlePath = core.getInput('gradlePath');
    const debug = core.getInput('debug') ?? false;
    updateFieldsInFile(gradlePath, supportedFields, debug)
} catch (error) {
    core.setFailed(error.message);
}