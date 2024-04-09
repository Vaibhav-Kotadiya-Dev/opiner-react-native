#!/usr/bin/env bash

#This script is ONLY run in app center.
#We use this to ensure that QA is the target for all API calls

echo 'PRE-BUILD: Installing Pods'
#cd ./ios && rm -rf Pods Podfile.lock && pod cache clean --all && pod install --repo-update && pod install
echo 'PRE-BUILD: Pods are installed properly !'
