/* eslint-disable object-curly-newline */
import React from 'react';
import { Typography } from '@material-tailwind/react';

export default function TrackRows({ results }) {
	results.sort((resultA, resultB) => resultA.pos - resultB.pos);
	return (
		<tbody>
			{results.map(({ pos, driver, car, numberoflaps, racetime }) => (
				<tr key={pos} className='even:bg-blue-gray-50/70'>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{pos}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{driver}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{car}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{numberoflaps}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{racetime}
						</Typography>
					</td>
				</tr>
			))}
		</tbody>
	);
}
