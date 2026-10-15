#!/bin/sh
# Exercises the real Nginx image before it may replace a running release.
# Runs inside the container during build and again as the Docker HEALTHCHECK.
set -eu
base="${1:-http://127.0.0.1:8080}"

printf '%s' "$CUBARESORT_RELEASE_SHA" | grep -Eq '^[0-9a-f]{40}$'

# release.json is pretty-printed, so allow whitespace after the colons.
release="$(wget -q -T 5 -O - "$base/release.json")"
printf '%s' "$release" | grep -Eq '"app"[[:space:]]*:[[:space:]]*"cubaresort"'
printf '%s' "$release" | grep -Eq "\"sha\"[[:space:]]*:[[:space:]]*\"$CUBARESORT_RELEASE_SHA\""

# The homepage must be the application, with the directory actually rendered
# into the HTML rather than left to a client-side fetch that could fail.
home="$(wget -q -T 5 -O - "$base/")"
printf '%s' "$home" | grep -Fq 'CUBARESORT.CA'
printf '%s' "$home" | grep -Fq 'region-chip'
printf '%s' "$home" | grep -Fq 'hotel-grid'
printf '%s' "$home" | grep -Fq 'Varadero'

# Next.js names its chunks by content hash, so the scripts to check are read
# from the page itself rather than hardcoded. Every one must be served and
# non-empty, which is what catches a half-copied dist/.
scripts="$(printf '%s' "$home" | tr '"' '\n' | grep '^/.*_next/static/.*\.js$' | sort -u)"
test -n "$scripts"
for path in $scripts; do
    # Strip any basePath prefix: Nginx serves dist/ at the root.
    rel="/_next/static/${path#*/_next/static/}"
    test -n "$(wget -q -T 5 -O - "$base$rel")"
done

test "$(wget -q -T 5 -O - "$base/healthz")" = ok
