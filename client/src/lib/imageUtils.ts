export async function removeWhiteBackground(
  src: string,
  options: { threshold?: number; crop?: boolean; scale?: number } = {}
): Promise<string> {
  const threshold = options.threshold ?? 240; // 0-255; higher removes more near-white
  const shouldCrop = options.crop ?? true;
  const scale = options.scale ?? 1; // scale output after crop

  await new Promise<void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    try {
      document.head.appendChild(link);
    } catch {
      resolve();
    }
  });

  const img = new Image();
  // Same-origin served by Vite; crossOrigin not required but safe.
  img.crossOrigin = "anonymous";
  img.src = src;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load logo image"));
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // If pixel is near-white, make it transparent
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0; // alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);

  if (shouldCrop) {
    // Find bounding box of non-transparent pixels
    let minX = canvas.width, minY = canvas.height, maxX = -1, maxY = -1;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const a = data[i + 3];
        if (a > 0) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX >= 0 && maxY >= 0) {
      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      const out = document.createElement("canvas");
      out.width = Math.max(1, Math.round(cropW * scale));
      out.height = Math.max(1, Math.round(cropH * scale));
      const octx = out.getContext("2d");
      if (!octx) throw new Error("Canvas context not available (output)");
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = "high";
      octx.drawImage(
        canvas,
        minX,
        minY,
        cropW,
        cropH,
        0,
        0,
        out.width,
        out.height
      );
      return out.toDataURL("image/png");
    }
  }

  return canvas.toDataURL("image/png");
}