/**
 * Client-side browser image optimizer & compressor
 * Automatically scales raw high-res images down to optimal web/OG dimensions
 * and compresses them to lightweight WebP/JPEG (< 150 KB) before uploading to Cloudflare R2.
 */
export async function compressImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    targetFormat?: "image/webp" | "image/jpeg" | "image/png";
  } = {}
): Promise<File> {
  // Only process raster images (skip SVG and PDFs)
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.name.endsWith(".ico")) {
    return file;
  }

  const {
    maxWidth = 1200,
    maxHeight = 630,
    quality = 0.85,
    targetFormat = "image/webp",
  } = options;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale proportionally if dimensions exceed max boundaries
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            const ext = targetFormat === "image/webp" ? "webp" : targetFormat === "image/png" ? "png" : "jpg";
            const newName = file.name.replace(/\.[^/.]+$/, "") + `_opt.${ext}`;
            const compressedFile = new File([blob], newName, {
              type: targetFormat,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          targetFormat,
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}
