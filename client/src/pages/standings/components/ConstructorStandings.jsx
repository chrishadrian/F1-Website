import { Typography } from '@material-tailwind/react';

export default function ConstructorStandings({ constructorStandings }) {
	return (
		<tbody>
			{constructorStandings.map(({ rank, constructor, points }) => (
				<tr key={rank} className='even:bg-blue-gray-50/70'>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{rank}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{constructor}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{points}
						</Typography>
					</td>
				</tr>
			))}
		</tbody>
	);
}
