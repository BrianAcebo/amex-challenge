import React, { FC } from 'react';
import {
	preloadCachingFetch,
	useCachingFetch
} from '../../caching-fetch-library/cachingFetch';
import { validateData } from '../validation';
import PrettyPerson from './PrettyPerson';
import PrettyPersonSkeleton from './PrettyPersonSkeleton';
import { PrettyStyles } from './styles';

const API_URL =
	'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole&seed=123';

const SKELETON_COUNT = 6;

type Application = FC & {
	preLoadServerData?: () => Promise<void>;
};

const AppWithSSRDataPretty: Application = () => {
	const {
		data: rawData,
		isLoading,
		error
	} = useCachingFetch(API_URL);

	return (
		<div className="pretty-app">
			<PrettyStyles />
			<div className="pretty-shell">
				<header className="pretty-top">
					<div>
						<p>
							<a className="pretty-back" href="/">
								← Home
							</a>
						</p>
						<h1 className="pretty-brand">People Directory</h1>
						<p className="pretty-lede">
							Same styled directory, but data is preloaded on the server and
							shipped in the HTML cache — so the list is ready on first paint.
						</p>
					</div>
					<p className="pretty-meta">
						Mode: <strong>with SSR data</strong>
						<br />
						Preloaded on the server
					</p>
				</header>

				{isLoading && (
					<section
						className="pretty-list"
						aria-busy="true"
						aria-label="Loading people"
					>
						{Array.from({ length: SKELETON_COUNT }, (_, index) => (
							<PrettyPersonSkeleton key={index} />
						))}
					</section>
				)}
				{!isLoading && (error || rawData === null) && (
					<p className="pretty-status error">Error: {error?.message}</p>
				)}
				{!isLoading && !error && rawData !== null && (
					<section className="pretty-list" aria-label="People">
						{validateData(rawData).map((person, index) => (
							<PrettyPerson key={person.email} index={index} />
						))}
					</section>
				)}
			</div>
		</div>
	);
};

AppWithSSRDataPretty.preLoadServerData = async () => {
	await preloadCachingFetch(API_URL);
};

export default AppWithSSRDataPretty;
