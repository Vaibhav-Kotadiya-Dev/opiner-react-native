#!/usr/bin/env bash

# Force the 1.7.5 version of cocoapods, as opposed to the version installed by AppCenter
echo "Uninstalling all cocoapods versions"
sudo gem uninstall cocoapods -a -x
echo "Installing cocoapods version 1.7.5"
sudo gem install cocoapods -v 1.7.5

# Upgrade Node to a version expected by React Native 0.60
# Run Yarn
yarn
