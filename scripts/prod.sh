#!/usr/bin/env bash

cp ./src/network/config.prod.ts ./src/network/config.ts
cp ./ios/GoogleService-Info_prod.plist ./ios/GoogleService-Info.plist
cp ./android/app/google-services_prod.json ./android/app/google-services.json
cd ios
fastlane ios prod