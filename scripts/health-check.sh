#!/bin/bash

# Simple health check script for NutriAware Platform
# Usage: ./health-check.sh --url <url> --timeout <seconds>

URL=""
TIMEOUT=30

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --url) URL="$2"; shift ;;
        --timeout) TIMEOUT="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$URL" ]; then
    echo "Error: URL is required"
    exit 1
fi

echo "Starting health check for $URL (timeout: ${TIMEOUT}s)..."

MAX_RETRIES=$((TIMEOUT / 5))
RETRY_COUNT=0
HEALTHY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    if [ "$RESPONSE" == "200" ]; then
        echo "Health check passed: $URL returned 200 OK"
        HEALTHY=true
        break
    else
        echo "Attempt $((RETRY_COUNT + 1)) failed: $URL returned $RESPONSE. Retrying in 5s..."
        sleep 5
        RETRY_COUNT=$((RETRY_COUNT + 1))
    fi
done

if [ "$HEALTHY" = true ]; then
    exit 0
else
    echo "Health check failed: $URL did not return 200 OK within ${TIMEOUT}s"
    exit 1
fi
