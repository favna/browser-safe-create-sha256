const isNodeJS = () => typeof process?.versions?.node !== 'undefined';

export function browserSafeCreateHash(val: string): string | Promise<string> {
	return browserSafeDigest()(val);
}

const hmacSecret = 'SapphireBrowserSafeSha256';
function browserSafeDigest() {
	if (isNodeJS()) {
		return (value: string): string => globalThis.crypto.createHmac('sha256', hmacSecret).update(value).digest('hex');
	}

	return async (value: string): Promise<string> => {
		const hashDigest = // @ts-expect-error The types of `node:crypto` are wrong within TS, `crypto.subtle` exists in both Node and Browsers
			await globalThis.crypto.subtle //
				.digest('SHA-256', new globalThis.TextEncoder().encode(value));

		const hexes: string[] = [];
		const view = new DataView(hashDigest);

		for (let i = 0; i < view.byteLength; i += 4) {
			hexes.push(`00000000${view.getUint32(i).toString(16)}`.slice(-8));
		}

		return hexes.join('');
	};
}

declare namespace globalThis {
	let crypto: typeof import('node:crypto');
	let TextEncoder: typeof import('node:util').TextEncoder;
}
