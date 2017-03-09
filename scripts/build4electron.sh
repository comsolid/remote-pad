#!/usr/bin/env bash
#
# Generates a version for use with remote-pad-gui (electron)
#

npm run build
if [[ -d electron ]]; then
    echo "Removing previous build for electron..."
    rm -r electron
fi
mkdir -p electron
echo "Copying files..."
cp -r dist production package.json yarn.lock LICENSE README.md electron
cd electron
yarn install --production
cd -
echo "Done."
