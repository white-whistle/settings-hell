import { Condition } from "./Condition";
import * as constants from './constants';

const usernameIncludes = (content: string) => {
	return Condition.from((state) => state.user.username.includes(content), `Username must include "${content}"`)
}

export default {
	general: {
		tos: {
			enabled: Condition.from((state) => state.general.tos, 'ToS must be enabled'),
			disabled: Condition.from((state) => state.general.tos, 'ToS must be disabled'),
		},
		antBuffer: {
			every: Condition.from(state => state.general.snake.every(Boolean), 'All switches must be checked')
		}
	},
	user: {
		username: {
			agreesTos: usernameIncludes(constants.TOS_AGREE_STRING),
			confirmsTos: usernameIncludes(constants.TOS_CONFIRM_STRING),
		}

	}
}