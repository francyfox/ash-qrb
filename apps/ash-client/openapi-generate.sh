# scripts/openapi-generate.sh
set -a && source ./.env && set +a

# Arg$1: The public api url.
if [ -z "$API_URL" ]; then
 echo "Please specify API_URL in the .env file."
 exit 1
fi

echo "🔑 Disabling NODE_TLS_REJECT_UNAUTHORIZED to allow introspecting HTTPS API."
export NODE_TLS_REJECT_UNAUTHORIZED=0

bunx openapi-typescript $API_URL/swagger/json --output ./src/assets/schema.ts