#!/usr/bin/env bash

list=`find . -name package.json | grep -v node_modules`
here=`pwd`

for item in $list
do
    cd $here/`expr "$item" : '\(.*\/\)'`
    yarn
done


