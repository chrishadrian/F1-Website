import { Card, Typography } from '@material-tailwind/react';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';

const DRIVERS_TABLE_HEAD = ['Rank', 'Driver', 'Car', 'Pts'];
const CONSTRUCTORS_TABLE_HEAD = ['Rank', 'Team', 'Pts'];

// https://www.material-tailwind.com/docs/react/table
export default function StandingTable({ selectedStanding, standings }) {
	return (
		<Card className='h-full w-full overflow-clip border-x-[1px]'>
			<table className='w-full min-w-max table-auto text-left'>
				<thead>
					<tr>
						{(selectedStanding === 'drivers' ? DRIVERS_TABLE_HEAD : CONSTRUCTORS_TABLE_HEAD).map((head) => (
							<th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
								<Typography
									variant='small'
									color='blue-gray'
									className='font-normal leading-none opacity-70'
								>
									{head}
								</Typography>
							</th>
						))}
					</tr>
				</thead>
				{selectedStanding === 'drivers' ? (
					<DriverStandings driverStandings={standings} />
				) : (
					<ConstructorStandings constructorStandings={standings} />
				)}
			</table>
		</Card>
	);
}
