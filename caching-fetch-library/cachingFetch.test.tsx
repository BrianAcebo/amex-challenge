/** @vitest-environment jsdom */

import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadCachingFetch, useCachingFetch } from './cachingFetch';

const jsonResponse = (data: unknown, status = 200) =>
	Promise.resolve(
		new Response(JSON.stringify(data), {
			status,
			headers: { 'Content-Type': 'application/json' }
		})
	);

describe('useCachingFetch', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('loads data for a url', async () => {
		const url = 'https://example.com/people-1';
		const people = [{ first: 'Ada', last: 'Lovelace' }];
		vi.mocked(fetch).mockImplementation(() => jsonResponse(people));

		const { result } = renderHook(() => useCachingFetch(url));

		expect(result.current.isLoading).toBe(true);
		expect(result.current.data).toBeNull();

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.data).toEqual(people);
		expect(result.current.error).toBeNull();
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(url);
	});

	it('shares one in-flight fetch across multiple hook callers', async () => {
		const url = 'https://example.com/people-shared';
		const people = [{ first: 'Grace', last: 'Hopper' }];

		let resolveFetch!: (value: Response) => void;
		vi.mocked(fetch).mockImplementation(
			() =>
				new Promise<Response>((resolve) => {
					resolveFetch = resolve;
				})
		);

		// Same pattern as App + Person + Name hitting one URL
		const first = renderHook(() => useCachingFetch(url));
		const second = renderHook(() => useCachingFetch(url));
		const third = renderHook(() => useCachingFetch(url));

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(first.result.current.isLoading).toBe(true);
		expect(second.result.current.isLoading).toBe(true);
		expect(third.result.current.isLoading).toBe(true);

		resolveFetch(
			new Response(JSON.stringify(people), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		await waitFor(() => {
			expect(first.result.current.isLoading).toBe(false);
			expect(second.result.current.isLoading).toBe(false);
			expect(third.result.current.isLoading).toBe(false);
		});

		expect(first.result.current.data).toEqual(people);
		expect(second.result.current.data).toEqual(people);
		expect(third.result.current.data).toEqual(people);
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	it('returns a cached result without fetching again', async () => {
		const url = 'https://example.com/people-cached';
		const people = [{ first: 'Alan', last: 'Turing' }];
		vi.mocked(fetch).mockImplementation(() => jsonResponse(people));

		const initial = renderHook(() => useCachingFetch(url));
		await waitFor(() => {
			expect(initial.result.current.isLoading).toBe(false);
		});
		expect(fetch).toHaveBeenCalledTimes(1);

		const again = renderHook(() => useCachingFetch(url));

		expect(again.result.current.isLoading).toBe(false);
		expect(again.result.current.data).toEqual(people);
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	it('surfaces fetch errors', async () => {
		const url = 'https://example.com/people-error';
		vi.mocked(fetch).mockImplementation(() => jsonResponse({ message: 'nope' }, 500));

		const { result } = renderHook(() => useCachingFetch(url));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeInstanceOf(Error);
		expect(result.current.error?.message).toMatch(/500/);
	});
});

describe('preloadCachingFetch', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('fills the cache so useCachingFetch can return data immediately', async () => {
		const url = 'https://example.com/people-preload';
		const people = [{ first: 'Katherine', last: 'Johnson' }];
		vi.mocked(fetch).mockImplementation(() => jsonResponse(people));

		await preloadCachingFetch(url);
		expect(fetch).toHaveBeenCalledTimes(1);

		const { result } = renderHook(() => useCachingFetch(url));

		// Sync cache hit — no loading state after preload
		expect(result.current.isLoading).toBe(false);
		expect(result.current.data).toEqual(people);
		expect(result.current.error).toBeNull();
		expect(fetch).toHaveBeenCalledTimes(1);
	});
});
