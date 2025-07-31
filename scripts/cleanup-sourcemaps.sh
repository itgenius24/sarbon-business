#!/bin/sh

# Script to remove source maps that could expose folder structure
# This script should be run after build in production

echo "🧹 Cleaning up source maps to prevent folder structure exposure..."

# Remove source maps from public directory
find public -name "*.map" -type f -delete 2>/dev/null || true

# Remove source maps from out directory (if using static export)
find out -name "*.map" -type f -delete 2>/dev/null || true

# Remove source maps from .next directory (server-side maps)
find .next -name "*.map" -type f -delete 2>/dev/null || true

echo "✅ Source map cleanup completed!"
