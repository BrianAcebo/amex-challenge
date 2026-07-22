import React from 'react';

/** Shared styles for the pretty demo pages (injected once per tree). */
export const PrettyStyles = () => (
	<>
		{/* Use <link> instead of @import — bare & in style tags gets parsed as HTML and 404s */}
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
		/>
		<style>{`
		.pretty-app {
			--ink: #14212b;
			--muted: #5c6b76;
			--line: #d5dee4;
			--surface: #f3f6f4;
			--accent: #0f6b5c;
			--danger: #9b2c2c;
			min-height: 100vh;
			margin: 0;
			color: var(--ink);
			font-family: 'DM Sans', system-ui, sans-serif;
			background:
				radial-gradient(1200px 500px at 10% -10%, #dceee8 0%, transparent 55%),
				radial-gradient(900px 400px at 100% 0%, #e7eef5 0%, transparent 50%),
				linear-gradient(180deg, #f7faf8 0%, var(--surface) 40%, #eef3f1 100%);
		}

		.pretty-app *,
		.pretty-app *::before,
		.pretty-app *::after {
			box-sizing: border-box;
		}

		.pretty-shell {
			width: min(880px, calc(100% - 2rem));
			margin: 0 auto;
			padding: 2.75rem 0 4rem;
		}

		.pretty-top {
			display: flex;
			flex-wrap: wrap;
			align-items: flex-end;
			justify-content: space-between;
			gap: 1rem;
			margin-bottom: 2.25rem;
			padding-bottom: 1.5rem;
			border-bottom: 1px solid var(--line);
		}

		.pretty-brand {
			font-family: 'Fraunces', Georgia, serif;
			font-size: clamp(2rem, 4vw, 2.75rem);
			font-weight: 600;
			letter-spacing: -0.03em;
			line-height: 1.1;
			margin: 0;
		}

		.pretty-lede {
			margin: 0.65rem 0 0;
			max-width: 34rem;
			color: var(--muted);
			font-size: 1.05rem;
			line-height: 1.5;
		}

		.pretty-meta {
			color: var(--muted);
			font-size: 0.9rem;
			text-align: right;
		}

		.pretty-meta strong {
			color: var(--accent);
			font-weight: 600;
		}

		.pretty-back {
			color: var(--accent);
			text-decoration: none;
			font-weight: 500;
			font-size: 0.95rem;
		}

		.pretty-back:hover {
			text-decoration: underline;
		}

		.pretty-status {
			padding: 1.5rem 0;
			color: var(--muted);
			font-size: 1.05rem;
		}

		.pretty-status.error {
			color: var(--danger);
		}

		.pretty-list {
			display: flex;
			flex-direction: column;
		}

		.pretty-person {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 1.35rem 0;
			border-bottom: 1px solid var(--line);
		}

		.pretty-person:first-child {
			padding-top: 0.25rem;
		}

		@media (min-width: 720px) {
			.pretty-person {
				grid-template-columns: 1.15fr 1fr;
				align-items: start;
			}
		}

		.pretty-person-name {
			font-family: 'Fraunces', Georgia, serif;
			font-size: 1.45rem;
			font-weight: 600;
			letter-spacing: -0.02em;
			margin: 0 0 0.35rem;
		}

		.pretty-person-email {
			margin: 0;
			color: var(--accent);
			font-weight: 500;
			word-break: break-word;
		}

		.pretty-facts {
			display: grid;
			gap: 0.7rem;
			margin: 0;
		}

		.pretty-facts div {
			display: grid;
			gap: 0.15rem;
		}

		.pretty-facts dt {
			margin: 0;
			font-size: 0.72rem;
			font-weight: 600;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: var(--muted);
		}

		.pretty-facts dd {
			margin: 0;
			font-size: 0.98rem;
			color: var(--ink);
		}

		.pretty-balance {
			font-weight: 600;
			font-variant-numeric: tabular-nums;
			color: var(--accent);
		}

		.pretty-skeleton-block {
			display: block;
			border-radius: 6px;
			background: linear-gradient(
				90deg,
				#e4ebe7 0%,
				#eef3f0 45%,
				#e4ebe7 90%
			);
			background-size: 200% 100%;
			animation: pretty-shimmer 1.2s ease-in-out infinite;
		}

		.pretty-skeleton-name {
			width: min(220px, 55%);
			height: 1.45rem;
			margin-bottom: 0.55rem;
		}

		.pretty-skeleton-email {
			width: min(280px, 70%);
			height: 0.95rem;
		}

		.pretty-skeleton-label {
			width: 72px;
			height: 0.65rem;
			margin-bottom: 0.35rem;
		}

		.pretty-skeleton-value {
			width: min(180px, 80%);
			height: 0.95rem;
		}

		@keyframes pretty-shimmer {
			0% { background-position: 100% 0; }
			100% { background-position: -100% 0; }
		}

		@media (prefers-reduced-motion: reduce) {
			.pretty-skeleton-block {
				animation: none;
			}
		}
	`}</style>
	</>
);
