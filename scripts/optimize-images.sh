#!/usr/bin/env zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE_DIR="$ROOT_DIR/public/image"
GALLERY_DIR="$IMAGE_DIR/gallery-image"
OPTIMIZED_DIR="$IMAGE_DIR/optimized"
LARGE_DIR="$OPTIMIZED_DIR/large"
THUMB_DIR="$OPTIMIZED_DIR/thumb"

mkdir -p "$LARGE_DIR" "$THUMB_DIR"

if [[ -f "$IMAGE_DIR/main-image.jpg" ]]; then
  sips -s format jpeg -s formatOptions 82 -Z 1800 "$IMAGE_DIR/main-image.jpg" --out "$OPTIMIZED_DIR/main-image.jpg" >/dev/null 2>&1
fi

find "$LARGE_DIR" -maxdepth 1 -type f -name '*.jpg' -delete
find "$THUMB_DIR" -maxdepth 1 -type f -name '*.jpg' -delete

find "$GALLERY_DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' \) -print0 |
while IFS= read -r -d '' file_path; do
  file_name="${file_path:t}"
  base_name="${file_name:r}"

  sips -s format jpeg -s formatOptions 82 -Z 2000 "$file_path" --out "$LARGE_DIR/$base_name.jpg" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 76 -Z 720 "$file_path" --out "$THUMB_DIR/$base_name.jpg" >/dev/null 2>&1
done

echo "Image optimization completed"
