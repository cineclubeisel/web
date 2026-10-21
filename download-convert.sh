#!/usr/bin/env bash
set -euo pipefail

# Identify ImageMagick binary (v7 'magick' or v6 'convert')
CONVERT_CMD=""
if command -v magick &>/dev/null; then
    CONVERT_CMD="magick"
elif command -v convert &>/dev/null; then
    CONVERT_CMD="convert"
fi

# Dependency validation
MISSING_DEPS=()

if [ -z "$CONVERT_CMD" ]; then
    MISSING_DEPS+=("imagemagick")
fi

for cmd in curl file; do
    if ! command -v "$cmd" &>/dev/null; then
        MISSING_DEPS+=("$cmd")
    fi
done

if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
    echo "Error: Missing required tools: ${MISSING_DEPS[*]}" >&2
    exit 1
fi

# Argument check
if [ $# -lt 1 ]; then
    echo "Usage: $0 <IMAGE_URL> [OUTPUT_FILENAME]" >&2
    echo "Example: $0 https://example.com/photo.jpg amelie-poster" >&2
    exit 1
fi

URL="$1"
CUSTOM_FILENAME="${2:-}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${SCRIPT_DIR}/src/content/img"

# Verify destination directory exists and is writable
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Directory '$TARGET_DIR' does not exist." >&2
    exit 1
fi

if [ ! -w "$TARGET_DIR" ]; then
    echo "Error: Directory '$TARGET_DIR' is not writable." >&2
    exit 1
fi

TEMP_FILE="$(mktemp)"

cleanup() {
    rm -f "$TEMP_FILE"
}
trap cleanup EXIT

echo "Downloading image..."
if ! curl -sSL -f "$URL" -o "$TEMP_FILE"; then
    echo "Error: Failed to download URL." >&2
    exit 1
fi

# Validate MIME type
MIME_TYPE="$(file --mime-type -b "$TEMP_FILE")"
if [[ "$MIME_TYPE" != image/* ]]; then
    echo "Error: File downloaded is not a valid image (MIME type: $MIME_TYPE)." >&2
    exit 1
fi

# Determine output filename
if [ -n "$CUSTOM_FILENAME" ]; then
    BASENAME="$(basename "$CUSTOM_FILENAME")"
    BASENAME="${BASENAME%.*}"
else
    URL_PATH="${URL%%\?*}"
    FILENAME="$(basename "$URL_PATH")"
    BASENAME="${FILENAME%.*}"
fi

if [ -z "$BASENAME" ] || [ "$BASENAME" = "/" ]; then
    BASENAME="image_$(date +%s)"
fi

OUTPUT_PATH="${TARGET_DIR}/${BASENAME}.webp"

# Overwrite check
if [ -f "$OUTPUT_PATH" ]; then
    read -rp "File '$OUTPUT_PATH' already exists. Overwrite? [y/N]: " CONFIRM
    case "$CONFIRM" in
        [yY][eE][sS]|[yY])
            ;;
        *)
            echo "Operation cancelled."
            exit 0
            ;;
    esac
fi

echo "Resizing to 512px height and converting to WebP..."
if $CONVERT_CMD "$TEMP_FILE" -resize "x512" "$OUTPUT_PATH"; then
    echo "Success: Saved to $OUTPUT_PATH"
else
    echo "Error: Conversion failed." >&2
    exit 1
fi