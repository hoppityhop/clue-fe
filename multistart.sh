#!/bin/bash

PORT=3000 npm start &
PORT=3001 npm start &
PORT=3002 npm start &
PORT=3003 npm start &

cd ..
