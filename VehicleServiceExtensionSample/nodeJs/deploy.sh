#!/bin/bash

# Function to print error message and exit
print_error() {
  echo "Step failed: $1"
  exit 1
}

# Execute npm run build
npm run build || print_error "npm run build"

skaffold run -f skaffold.yaml
