type ImageOptions = {
	width?: number;
	quality?: number;
};

const sanityImageDimensionsPattern = /-(\d+)x(\d+)\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?|$)/i;

function isSanityImageUrl(src: string) {
	try {
		return new URL(src).hostname === 'cdn.sanity.io';
	} catch {
		return false;
	}
}

export function getImageDimensions(src: string | undefined) {
	if (!src) return undefined;

	const match = src.match(sanityImageDimensionsPattern);
	if (!match) return undefined;

	const width = Number(match[1]);
	const height = Number(match[2]);

	return Number.isFinite(width) && Number.isFinite(height) ? { width, height } : undefined;
}

export function optimizedSanityImageUrl(src: string | undefined, options: ImageOptions = {}) {
	if (!src || !isSanityImageUrl(src)) return src;

	const url = new URL(src);

	url.searchParams.set('auto', 'format');
	url.searchParams.set('q', String(options.quality ?? 75));

	if (options.width) {
		url.searchParams.set('w', String(options.width));
		url.searchParams.set('fit', 'max');
	}

	return url.href;
}

export function optimizedSanityImageSrcset(
	src: string | undefined,
	widths: number[],
	options: Omit<ImageOptions, 'width'> = {}
) {
	if (!src || !isSanityImageUrl(src)) return undefined;

	const dimensions = getImageDimensions(src);
	const maxWidth = dimensions?.width;
	const candidates = widths.filter((width) => !maxWidth || width <= maxWidth);
	const selectedWidths = candidates.length ? candidates : maxWidth ? [maxWidth] : [];

	if (!selectedWidths.length) return undefined;

	return selectedWidths
		.map((width) => `${optimizedSanityImageUrl(src, { ...options, width })} ${width}w`)
		.join(', ');
}
