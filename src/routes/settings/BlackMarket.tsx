import SettingsSkeleton from '../../components/SettingsSkeleton';
import Vertical from '../../components/Vertical';
import conditions from '../../core/conditions';
import { G } from '../../components/game';

function BlackMarket() {
	return (
		<SettingsSkeleton>
			<Vertical className='gap-4 items-start'>
				<Vertical>
					<G.If
						not
						condition={conditions.general.tos.enabled}
						error='ToS forbids the use of the black market'
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Nam quo corrupti aliquid eaque labore harum enim
						possimus veniam aut vero? Id sed libero corporis. Neque,
						ut tempore. Aliquid commodi adipisci aut dolore officiis
						libero sequi, deserunt, nostrum temporibus laboriosam
						nihil eaque itaque quidem. Deserunt porro dolore
						laudantium aut dicta reiciendis similique cum, quis
						praesentium ut. Aperiam tempora aspernatur ipsam odio
						error maxime impedit ipsum aliquam cum, soluta nisi,
						reprehenderit quia neque alias hic enim quam laboriosam
						maiores. Odit, sint praesentium? Odio quod minima,
						expedita omnis eius dolorum sunt laboriosam optio non
						sapiente numquam tempora, saepe molestiae, ea unde?
						Deleniti, suscipit!
					</G.If>
				</Vertical>
			</Vertical>
		</SettingsSkeleton>
	);
}

export default BlackMarket;
