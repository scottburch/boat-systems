#!/usr/bin/env bash

yarn network-bridge &
yarn autopilot-hardware &
yarn autopilot &
yarn nema-bridge &
yarn ais-interface &