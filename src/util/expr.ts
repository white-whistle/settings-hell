export default function expr<T extends () => any>(cb: T) {
	return cb();
}