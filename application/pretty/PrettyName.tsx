import React, { FC } from 'react';
import { useCachingFetch } from '../../caching-fetch-library/cachingFetch';
import { validateData } from '../validation';

const API_URL =
	'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole&seed=123';

const PrettyName: FC<{ index: number }> = ({ index }) => {
	const {
		data: rawData,
		isLoading,
		error
	} = useCachingFetch(API_URL);

	if (isLoading) return <h2 className="pretty-person-name">Loading name…</h2>;
	if (error || rawData === null) {
		return <h2 className="pretty-person-name">Unavailable</h2>;
	}

	const person = validateData(rawData)[index];

	return (
		<h2 className="pretty-person-name">
			{person.first} {person.last}
		</h2>
	);
};

export default PrettyName;
