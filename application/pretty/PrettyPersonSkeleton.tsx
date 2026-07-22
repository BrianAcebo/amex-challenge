import React, { FC } from 'react';

const PrettyPersonSkeleton: FC = () => (
	<article className="pretty-person" aria-hidden="true">
		<div>
			<span className="pretty-skeleton-block pretty-skeleton-name" />
			<span className="pretty-skeleton-block pretty-skeleton-email" />
		</div>
		<dl className="pretty-facts">
			<div>
				<span className="pretty-skeleton-block pretty-skeleton-label" />
				<span className="pretty-skeleton-block pretty-skeleton-value" />
			</div>
			<div>
				<span className="pretty-skeleton-block pretty-skeleton-label" />
				<span className="pretty-skeleton-block pretty-skeleton-value" />
			</div>
			<div>
				<span className="pretty-skeleton-block pretty-skeleton-label" />
				<span className="pretty-skeleton-block pretty-skeleton-value" />
			</div>
		</dl>
	</article>
);

export default PrettyPersonSkeleton;
