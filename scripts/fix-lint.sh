#!/bin/bash

# Fix ESLint issues automatically
echo "🔧 Running ESLint auto-fix..."
npx eslint --fix src/ --ext .js,.jsx

echo "✅ ESLint auto-fix completed!"
echo ""
echo "📋 Remaining issues:"
npx eslint src/ --ext .js,.jsx --format=compact

echo ""
echo "💡 To fix remaining issues manually:"
echo "   - Remove unused variables and imports"
echo "   - Add missing dependencies to useEffect hooks"
echo "   - Fix any remaining formatting issues"
