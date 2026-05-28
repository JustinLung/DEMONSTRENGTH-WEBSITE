import { createClient } from '@sanity/client';
import { isSanityConfigured, sanityConfig } from './config';

export const sanityClient = createClient(sanityConfig);

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
	if (!isSanityConfigured) return null;

	return sanityClient.fetch<T>(query, params);
}
