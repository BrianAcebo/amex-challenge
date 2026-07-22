import { describe, expect, it } from 'vitest';
import buildHtmlDoc from './buildHtmlDoc';

describe('buildHtmlDoc', () => {
	it('wraps app HTML and includes the client script by default', () => {
		const html = buildHtmlDoc(['<h1>Hello</h1>']);

		expect(html).toContain('<div id="app"><h1>Hello</h1></div>');
		expect(html).toContain('<script src="/client.js"></script>');
		expect(html).not.toContain('__INITIAL_DATA__');
	});

	it('injects initial data when provided', () => {
		const html = buildHtmlDoc(['<h1>Hello</h1>', '{"foo":1}']);

		expect(html).toContain(`window.__INITIAL_DATA__ = '{"foo":1}'`);
	});

	it('omits the client script when withScript is false', () => {
		const html = buildHtmlDoc(['<h1>Hello</h1>'], false);

		expect(html).not.toContain('<script src="/client.js"></script>');
	});
});
