#!/bin/bash

# Array of ports to be checked
ports=(3000 3001 3002 3003)

# Loop through each port
for port in "${ports[@]}"
do
    echo "Checking for processes on port $port..."

    # Find the PID of the process using the port
    pid=$(lsof -t -i:$port)

    # Check if a PID was found
    if [ ! -z "$pid" ]; then
        echo "Killing process $pid on port $port..."
        kill $pid

        if [ $? -eq 0 ]; then
            echo "Process $pid on port $port killed successfully."
        else
            echo "Failed to kill process $pid on port $port."
        fi
    else
        echo "No process found on port $port."
    fi
done

echo "All specified ports have been checked."

