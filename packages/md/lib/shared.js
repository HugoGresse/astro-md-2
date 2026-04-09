export const symbol = Symbol.for('astro-md-2')

export const shared = /** @type {Shared} */ (
	globalThis[symbol] || (
		globalThis[symbol] = {
			markdownConfig: {},
		}
	)
)

/** @typedef {import('./shared').Shared} Shared */
