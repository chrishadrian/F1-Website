/* eslint-disable object-curly-newline */
import { Typography } from '@material-tailwind/react';

export default function ConstructorsRows({ constructors, stats }) {
	constructors.sort((resultA, resultB) => resultA.name - resultB.name);
	stats.sort((resultA, resultB) => resultA.name - resultB.name);

	return (
		<tbody>
			{constructors.map(({ name, teamprincipal, championships }, index) => (
				<tr key={name} className='even:bg-blue-gray-50/70'>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{name}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{teamprincipal}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{championships}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{stats[index].total_races}
						</Typography>
					</td>
				</tr>
			))}
		</tbody>
	);
}
