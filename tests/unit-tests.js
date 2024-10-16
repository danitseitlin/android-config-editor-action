const { replaceValueInText } = require('../src/utils')
const { expect } = require('chai')
const fs = require('fs')
describe('Sanity testing', async function() {
    it('Testing replaceValueInText function', async() => {
        const data = {
            applicationId: { previousValue: 'test.app.id', newValue: 'my.test-app.id'},
            minSdkVersion: { previousValue: 28, newValue: 34 },
            targetSdkVersion: { previousValue: 28, newValue: 34 },
            versionCode: { previousValue: 15, newValue: 12 },
            versionName: { previousValue: "2.2", newValue: "4.2" }
        }

        const fields = Object.keys(data)
        for(const fieldName of fields) {
            const { previousValue, newValue } = data[fieldName]
            const gradlePath = './tests/test.build.gradle'
            fs.readFile(gradlePath, 'utf8', function (err, data) {
                newGradle = data;
                const regexPattern = new RegExp(`(${fieldName}(?:\s|=)*)(.*)`)
                const expectedPreviousValue = typeof previousValue === 'string' ? `"${previousValue}"`: previousValue
                expect(newGradle.match(regexPattern)[0]).to.equal(`${fieldName} ${expectedPreviousValue}`)
                newGradle = replaceValueInText(newGradle, fieldName, newValue)
                const expectedNewValue = typeof previousValue === 'string' ? `"${newValue}"`: newValue
                expect(newGradle.match(regexPattern)[0]).to.equal(`${fieldName} ${expectedNewValue}`)
            });
        }
        
    });
});

