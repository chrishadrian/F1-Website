/* eslint-disable object-curly-newline */
import React from 'react';
import { Typography } from '@material-tailwind/react';

export default function AllRows({ results, setSelectedTrack }) {
	results.sort((resultA, resultB) => resultA.pos - resultB.pos);
	return (
		<tbody>
			{results.map(({ gp, racedate, winner, cname, numberoflaps, racetime }) => (
				<tr key={gp} className='even:bg-blue-gray-50/70'>
					<td className='p-4'>
						<Typography
							as='a'
							href='#'
							variant='small'
							color='blue-gray'
							className='font-medium hover:text-light-blue-800 hover:cursor-pointer'
							onClick={() => {
								setSelectedTrack(gp.toLowerCase());
							}}
						>
							{gp}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{racedate.split('T')[0]}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{winner}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{cname}
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
