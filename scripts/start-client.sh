#!/usr/bin/env bash

yarn client-compile;
yarn network-bridge &
yarn client