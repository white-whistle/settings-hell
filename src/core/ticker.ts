import { useEffect } from "react";

export type TickCallback = (deltaMs: number, t: typeof ticker) => void;

const ticker = {

	running: false,
	lastTimestamp: undefined as undefined | number,
	listeners: [] as TickCallback[],

	start() {
		if (this.running) return;

		this.running = true;
		requestAnimationFrame(this.handleFrame.bind(this));
	},

	stop() {
		this.running = false;
	},

	handleFrame(timestamp: number) {
		if (!this.running) return;

		const deltaMs = timestamp - (this.lastTimestamp ?? timestamp);
		this.lastTimestamp = timestamp;

		this.tick(deltaMs);

		requestAnimationFrame(this.handleFrame.bind(this));
	},

	tick(deltaMs: number) {
		for (const listener of this.listeners) {
			listener(deltaMs, this);
		}
	},

	add(cb: TickCallback) {
		this.listeners.push(cb)

		return () => {
			this.remove(cb);
		}
	},

	remove(cb: TickCallback) {
		const idx = this.listeners.indexOf(cb);
		if (idx < 0) return;

		this.listeners.splice(idx, 1);
	},

	every(ms: number, cb: TickCallback) {
		let agg = 0;

		return this.add((delta, ticker) => {
			agg += delta;

			while (agg > ms) {
				cb(delta, ticker);
				agg -= ms;
			}
		});
	},

	clear() {
		this.listeners.length = 0;
	}

};

export function useTicker(cb: TickCallback, enabled = false) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!enabled) return;

		return ticker.add(cb)
	}, [enabled])
}

export function useTickerEvery(ms: number, cb: TickCallback, enabled = false) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!enabled) return;

		return ticker.every(ms, cb)
	}, [enabled, ms])
}

export const MS = {
	SECOND: 1000,
}

export default ticker;