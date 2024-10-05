import { Card, Typography } from '@material-tailwind/react';
import ResultRows from './ResultRows';

const RESULTS_TABLE_HEAD = ['Grand Prix', 'Date', 'Winner', 'Car', 'Laps', 'Time'];
const TRACKS_TABLE_HEAD = ['Pos', 'Driver', 'Car', 'Laps', 'Time'];

// https://www.material-tailwind.com/docs/react/table
export default function ResultTable({ results, setSelectedTrack, trackMenu }) {
	results.sort((resultA, resultB) => resultB.raceid - resultA.raceid);

	return (
		<Card className='h-full w-full overflow-clip border-x-[1px]'>
			<table className='w-full min-w-max table-auto text-left'>
				<thead>
					<tr>
						{(trackMenu ? TRACKS_TABLE_HEAD : RESULTS_TABLE_HEAD).map((head) => (
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
				<ResultRows results={results} setSelectedTrack={setSelectedTrack} trackMenu={trackMenu} />
			</table>
		</Card>
	);
}
