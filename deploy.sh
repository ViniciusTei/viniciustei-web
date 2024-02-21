#!/bin/bash
OUT=/usr/share/nginx/html/dist

git fetch
git pull

sudo cp -a . $OUT 
cd $OUT && npm run tailwind:build
