import { Dialog } from '@mui/material';
import propify from '../util/propify';
import { motion } from 'framer-motion';

export default propify(Dialog, {
	component: motion.div,
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	layoutId: 'motion-dialog',
});
