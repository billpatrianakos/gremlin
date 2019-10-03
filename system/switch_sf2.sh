#!/usr/bin/env bash

echo "load $1" > /dev/tcp/localhost/9988
echo "Loaded: $1"
