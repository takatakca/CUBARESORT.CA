#!/bin/sh
set -eu
base="${1:-http://127.0.0.1:8080}"
printf '%s' "$CUBARESORT_RELEASE_SHA" | grep -Eq '^[0-9a-f]{40}$'
release="$(wget -q -T 5 -O - "$base/release.json")"
printf '%s' "$release" | grep -Fq '"app":"cubaresort"'
printf '%s' "$release" | grep -Fq "\"sha\":\"$CUBARESORT_RELEASE_SHA\""
wget -q -T 5 -O - "$base/" | grep -Fq 'CUBARESORT.CA'
for asset in app.js styles.css hotels.js; do
    test -n "$(wget -q -T 5 -O - "$base/assets/$asset")"
done
test "$(wget -q -T 5 -O - "$base/healthz")" = ok
