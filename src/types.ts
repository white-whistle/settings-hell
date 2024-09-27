export type Paths<T> = {
	[K in keyof T]: K extends string | number ?
	T[K] extends object ?
	// Recursively generate paths for nested objects
	K | `${K}.${Paths<T[K]>}` :
	K :
	never;
}[keyof T];

export type Get<T, Path extends string> =
	Path extends `${infer Key}.${infer Rest}`
	? Key extends keyof T
	? Get<T[Key], Rest>
	: never
	: Path extends keyof T
	? T[Path]
	: never;