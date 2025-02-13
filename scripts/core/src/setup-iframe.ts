import { createElement } from './create-element';
import { setupNavigationUpdate } from './setup-navigation-update';

export function setupIframe(main: HTMLElement, appUrl: string) {
	const iframe = createElement<HTMLIFrameElement>(
		`<iframe src="${appUrl}" allow="clipboard-read; clipboard-write; camera" style="width: 100vw; height: 100vh; border: none;"></iframe>`,
	);

	setupNavigationUpdate(iframe);

	main.append(iframe);
}
