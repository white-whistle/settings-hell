import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { BaseModalProps } from '../hooks/useModal';
import MotionDialog from '../components/MotionDialog';
import { G } from '../components/game';
import conditions from '../core/conditions';
import Vertical from '../components/Vertical';
import Button from '../components/game/Button';

function GeneralTosModal({ onClose }: BaseModalProps) {
	return (
		<MotionDialog onClose={onClose} open>
			<DialogTitle>General Settings ToS</DialogTitle>
			<DialogContent>
				<Typography>
					The following are the terms of service for general access to
					the game's settings.
				</Typography>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
				sit officia quisquam modi accusamus, quibusdam perferendis
				corporis assumenda, ipsa reprehenderit voluptate repudiandae
				magni tenetur beatae commodi odit! Corrupti, neque quidem
				deserunt ducimus quasi labore officiis distinctio ut vitae
				accusamus placeat expedita quod cupiditate odio eius. Error
				dolores debitis culpa consequuntur eaque voluptatum possimus
				dicta dolorem ipsam quas. Sit, corrupti excepturi? Expedita,
				ipsam rem dolorem aspernatur ullam, omnis saepe consectetur
				aperiam impedit vel facilis velit voluptatibus id ea eum officia
				accusamus atque consequatur facere, corrupti libero repellendus?
				Odit tenetur, reiciendis, dolorem iure repudiandae earum non
				laboriosam, possimus quasi praesentium totam inventore. Vero
				obcaecati repudiandae earum, doloribus ratione itaque.
				Praesentium, nobis esse incidunt quos minima blanditiis aut
				voluptas labore quis eaque dolore expedita velit iure saepe quam
				exercitationem voluptate, sapiente facilis? Aspernatur
				accusamus, dicta nulla corporis quae vero ut ad cupiditate
				recusandae obcaecati quos architecto voluptate minus vitae
				ratione, dolores amet consequuntur perferendis fugit voluptatem
				porro. Unde, nulla quisquam dolor debitis magni voluptas aliquid
				perferendis quibusdam aspernatur explicabo praesentium
				reprehenderit aliquam rerum sint iste? Ab quibusdam autem
				adipisci fugiat nam soluta, corrupti tempore ullam totam
				doloribus, nisi, molestias suscipit saepe delectus sed ratione
				tempora distinctio hic illo placeat inventore quisquam!
				Veritatis, commodi! Lorem ipsum dolor sit, amet consectetur
				adipisicing elit. Beatae recusandae aliquid voluptatem adipisci
				est repudiandae tenetur omnis cum consequuntur nemo labore odit
				tempore quos culpa quasi facere dolores et, libero quia aperiam
				incidunt a alias cumque. Impedit ipsum ex animi nostrum. Aliquam
				sed, nostrum dolore inventore nesciunt et perferendis corrupti
				harum ipsam cumque impedit! Eum nesciunt sed explicabo inventore
				possimus, a ad sapiente assumenda! Error sint ipsum adipisci
				quas, itaque, debitis obcaecati modi deleniti et quos sit rem.
				Eveniet dolore aperiam molestias nam voluptates a recusandae qui
				officiis expedita itaque fugiat veritatis doloribus, quaerat
				dignissimos nesciunt in distinctio repellat exercitationem
				assumenda dolorem unde accusamus est, ratione natus. Quasi vitae
				mollitia laborum eligendi saepe tempora dolorem deleniti
				accusamus perferendis tempore aperiam, sunt, hic facere fuga a
				corrupti porro! Temporibus quia earum odit quas cum tempora vel
				quo tempore modi, soluta officiis porro, fugit similique iure
				pariatur. Dolores amet et nemo, culpa, illo veniam praesentium
				minus voluptates vero laudantium quaerat eius sunt dolorum
				nostrum quae doloremque, ullam aliquam? Perferendis deleniti
				dolores accusamus corporis, magnam unde natus, aspernatur
				deserunt aliquid exercitationem cumque? Quo, asperiores et!
				Illum consequatur ipsa fuga consequuntur, facilis ea ex
				excepturi ut. Quaerat et odit incidunt iure dicta est
				temporibus!
				<G.Checkbox
					condition={conditions.user.username.agreesTos}
					label='I have read and accept the terms of service'
					property='general.tos'
				/>
			</DialogContent>
			<DialogActions>
				<Vertical className='items-end'>
					<Button onClick={() => onClose()}>close</Button>
				</Vertical>
			</DialogActions>
		</MotionDialog>
	);
}

export default GeneralTosModal;
