import { Typography } from '@material-tailwind/react';

export default function DriverStandings({ driverStandings }) {
	return (
		<tbody>
			{driverStandings.map(({ rank, driver, car, points }) => (
				<tr key={rank} className='even:bg-blue-gray-50/70'>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{rank}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography variant='small' color='blue-gray' className='font-normal'>
							{driver}
						</Typography>
					</td>
					<td className='p-4'>
						<Typography
							as='a'
							href='#'
							variant='small'
							color='blue-gray'
							className='font-medium hover:text-light-blue-800'
						>
							{car}
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
