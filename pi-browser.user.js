// ==UserScript==
// @name         Pi Browser
// @namespace    https://github.com/b-derouet/pi-browser
// @version      1.0
// @description  Script to recreate the Pi Browser app within a browser on your computer
// @author       B. Derouet (https://github.com/b-derouet)
// @match        https://app-cdn.minepi.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minepi.com
// @run-at       document-idle
// @noframes
// @grant        none
// ==/UserScript==

(async function () {
	if (!localStorage.getItem('@pi:webview_ui_behaviors')) {
		const config = {
			platform: { desktop: true, os: 'win32', version: '10.0.0', arch: 'x64', uuid: '', hostApp: 'pi-node' },
			bundleData: { versionNumber: '0.4.5', buildNumber: 'proton', bundleIdentifier: 'com.pinetwork.desktop' },
		};

		localStorage.setItem('@pi:webview_ui_behaviors', JSON.stringify(config));
		location.reload();
	}

	if (location.href === 'https://app-cdn.minepi.com/mobile-app-ui/close.html') {
		location.href = 'https://app-cdn.minepi.com/mobile-app-ui/node-signin';
	}

	function createElement(text) {
		const { body } = new DOMParser().parseFromString(text, 'text/html');
		const elements = [...body.children];

		return elements.length === 1 ? elements[0] : elements;
	}

	if (location.href.startsWith('https://app-cdn.minepi.com/browser')) {
		const main = document.querySelector('main');

		main.parentElement.children[0].remove();
		main.style.paddingLeft = '0px';

		const tempUrl = new URL(location.href).searchParams.get('url');
		const url = tempUrl.replace('pi://', 'https://');
		const appHostname = new URL(url).hostname;
		const userToken = localStorage.getItem('mobile-app-webview-ui_access-token');
		const appRequest = await fetch(`https://socialchain.app/api/mobile_app/resolved_url?q=${appHostname}`, {
			headers: { Authorization: userToken },
		});
		const appData = await appRequest.json();
		const securedUrl = appData.redirect_url.replace('http://', 'https://');
		const iframe = createElement(
			`<iframe src="${securedUrl}" allow="clipboard-read; clipboard-write; camera" style="width: 100vw; height: 100vh; border: none;"></iframe>`,
		);

		main.appendChild(iframe);
	}
})();