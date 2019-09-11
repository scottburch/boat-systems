#!/usr/bin/env bash

list=`find . -name yarn.lock | grep -v node_modules`
here=`pwd`

for item in $list
do
    cd $here/`expr "$item" : '\(.*\/\)'`
    yarn
done


