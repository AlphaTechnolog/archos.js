#!/bin/bash

curl -sL https://raw.githubusercontent.com/AlphaTechnolog/archos.js/dev/create -o create
node create $1
rm create
