#!/usr/bin/env bash

cp ./src/network/config.staging.ts ./src/network/config.ts
cp ./ios/GoogleService-Info_dev.plist ./ios/GoogleService-Info.plist
cp ./android/app/google-services_dev.json ./android/app/google-services.json
cd ios
fastlane ios beta