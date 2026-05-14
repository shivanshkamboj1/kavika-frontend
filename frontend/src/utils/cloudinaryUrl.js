/**
 * Build an optimised Cloudinary image URL.
 *
 * Applies `f_auto` (WebP / AVIF when the browser supports it),
 * `q_auto` (perceptual quality optimisation), and an optional width.
 *
 * @param {string} publicId  – Cloudinary public ID (no extension)
 * @param {object} opts
 * @param {number} [opts.width]   – Resize to this width (px)
 * @param {number} [opts.height]  – Resize to this height (px)
 * @param {string} [opts.crop]    – Crop mode, default "fill"
 * @param {string} [opts.quality] – Quality, default "auto"
 * @param {string} [opts.gravity] – Gravity for crop, default "auto"
 * @returns {string}
 */
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

export function cloudinaryUrl(publicId, opts = {}) {
  const transforms = ['f_auto', `q_${opts.quality || 'auto'}`];

  if (opts.width) transforms.push(`w_${opts.width}`);
  if (opts.height) transforms.push(`h_${opts.height}`);
  if (opts.width || opts.height) {
    transforms.push(`c_${opts.crop || 'fill'}`);
    transforms.push(`g_${opts.gravity || 'auto'}`);
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

/**
 * Generate a srcSet string for responsive images.
 *
 * @param {string} publicId – Cloudinary public ID (no extension)
 * @param {number[]} widths – Array of widths to generate, e.g. [400, 800, 1200]
 * @returns {string} – Ready-to-use srcSet value
 */
export function cloudinarySrcSet(publicId, widths = [400, 800, 1200]) {
  return widths
    .map((w) => `${cloudinaryUrl(publicId, { width: w })} ${w}w`)
    .join(', ');
}

/**
 * Build an optimised Cloudinary video URL.
 *
 * @param {string} publicId – Cloudinary public ID (no extension)
 * @param {object} opts
 * @param {string} [opts.quality] – Quality, default "auto"
 * @returns {string}
 */
export function cloudinaryVideoUrl(publicId, opts = {}) {
  const transforms = ['f_auto', `q_${opts.quality || 'auto'}`];
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms.join(',')}/${publicId}`;
}
