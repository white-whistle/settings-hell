import { ComponentProps } from 'react';

export default function propify<
	T extends (props: any) => any,
	TDefaults extends Partial<ComponentProps<T>>
>(Comp: T, defaults: TDefaults) {
	type NewProps = Omit<ComponentProps<T>, keyof TDefaults> &
		Partial<TDefaults>;

	return (props: NewProps) => {
		// @ts-ignore
		return <Comp {...defaults} {...props} />;
	};
}
