import React, { FC } from 'react';
import { useCachingFetch } from '../../caching-fetch-library/cachingFetch';
import { validateData } from '../validation';
import PrettyName from './PrettyName';

const API_URL =
	'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole&seed=123';

const PrettyPerson: FC<{ index: number }> = ({ index }) => {
	const {
		data: rawData,
		isLoading,
		error
	} = useCachingFetch(API_URL);

	if (isLoading) {
		return (
			<article className="pretty-person">
				<p className="pretty-status">Loading person…</p>
			</article>
		);
	}

	if (error || rawData === null) {
		return (
			<article className="pretty-person">
				<p className="pretty-status error">Error: {error?.message}</p>
			</article>
		);
	}

	const person = validateData(rawData)[index];

	return (
		<article className="pretty-person">
			<div>
				<PrettyName index={index} />
				<p className="pretty-person-email">{person.email}</p>
			</div>
			<dl className="pretty-facts">
				<div>
					<dt>Address</dt>
					<dd>{person.address}</dd>
				</div>
				<div>
					<dt>Balance</dt>
					<dd className="pretty-balance">{person.balance}</dd>
				</div>
				<div>
					<dt>Joined</dt>
					<dd>{person.created}</dd>
				</div>
			</dl>
		</article>
	);
};

export default PrettyPerson;
