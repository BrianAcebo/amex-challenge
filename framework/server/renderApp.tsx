import App from '../../application/App';
import AppWithSSRDataPretty from '../../application/pretty/AppWithSSRDataPretty';
import AppWithoutSSRDataPretty from '../../application/pretty/AppWithoutSSRDataPretty';
import React, { ComponentType } from 'react';
import ReactDOMServer from 'react-dom/server';
import { serializeCache } from '../../caching-fetch-library/cachingFetch';

type Application = ComponentType & {
	preLoadServerData?: () => Promise<void>;
};

export type AppVariant = 'default' | 'prettyWithoutSSR' | 'prettyWithSSR';

const apps: Record<AppVariant, Application> = {
	default: App,
	prettyWithoutSSR: AppWithoutSSRDataPretty,
	prettyWithSSR: AppWithSSRDataPretty
};

const renderApp = async (
	loadDataInServer: boolean,
	variant: AppVariant = 'default'
): Promise<[string, string?]> => {
	const SelectedApp = apps[variant];

	let initialData;
	if (loadDataInServer && typeof SelectedApp.preLoadServerData === 'function') {
		await SelectedApp.preLoadServerData();
		initialData = serializeCache();
	}

	return [ReactDOMServer.renderToString(<SelectedApp />), initialData];
};

export default renderApp;
