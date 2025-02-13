export function configUserAgent() {
	const userAgentProperty = {
		get: () =>
			'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.153 Mobile Safari/537.36 PiBrowser/1.6.1',
	};
	const vendorProperty = {
		get: () => 'Google Inc.',
	};

	try {
		Object.defineProperty(window.navigator, 'userAgent', userAgentProperty);
		Object.defineProperty(window.navigator, 'vendor', vendorProperty);
	} catch {
		window.navigator = Object.create(navigator, {
			userAgent: userAgentProperty,
			vendor: vendorProperty,
		});
	}
}
