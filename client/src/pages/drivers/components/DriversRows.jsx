import { Typography } from '@material-tailwind/react';

export default function DriversRows({ drivers }) {
	drivers.sort((resultA, resultB) => resultB.podiums - resultA.podiums);

	return (
		<tbody>
			{drivers.map(({ name, team, podiums, wins, championships }) => (
				<tr key={name} className='even:bg-blue-gray-50/70'>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{name}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{team}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{podiums}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{wins}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{championships}
						</Typography>
					</td>
				</tr>
			))}
		</tbody>
	);
}
