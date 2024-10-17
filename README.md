<h1 align='center'>Android config editor <g-emoji class='g-emoji' alias='point_right' fallback-src='https://github.githubassets.com/images/icons/emoji/unicode/1f449.png'>👉</g-emoji> Make your Android deployments a bit faster!</h1>

## :fire: Integrate with GitHub actions
You can integrate with a GitHub action workflow using the 'android-config-editor' GitHub action:
```
deployment:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setting up the environment
      run: npm install
    - name: Update Android config file
      uses: danitseitlin/android-config-editor-action@latest
      with:
        gradlePath: android/app/build.gradle
        versionCode: 22
```

| Parameters          | Explanation                                                              |
|-------------------- |--------------------------------------------------------------------------|
| gradlePath          | The path to the Gradle file we want to adjust. Default: android/app/build.gradle |
| applicationId       | The new application ID                                                   |
| versionCode         | The new version code                                                     |
| versionName         | The new version name                                                     |
| minSdkVersion       | The new min SDK version                                                  |
| targetSdkVersion    | The new target SDK version                                               |
| debug               | If to print debug logs. Default: false                                   |
