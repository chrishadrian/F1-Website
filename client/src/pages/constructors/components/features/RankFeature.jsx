import React, { useState } from 'react';
import { Typography, Input, DialogBody, DialogFooter, Button, Spinner } from '@material-tailwind/react';

export default function RankFeature({ handleOpen }) {
	const [value, setValue] = useState('');
	const [filteredConstructors, setFilteredConstructors] = useState(undefined);
	const [loading, setLoading] = useState(false);

	const handleSearchClicked = async () => {
		setLoading(true);
		try {
			const response = await fetch(`http://localhost:50000/constructors/ranks/${value}`);
			const { result } = await response.json();
			result.sort((resultA, resultB) => resultB.year - resultA.year);
			setFilteredConstructors(result);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const TABLE_HEAD = ['Constructors', 'Year'];
	return filteredConstructors !== undefined ? (
		<table className='w-full min-w-max table-auto text-left'>
			<thead>
				<tr>
					{TABLE_HEAD.map((head) => (
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
			<tbody>
				{filteredConstructors.map(({ name, year }) => (
					<tr key={name} className='even:bg-blue-gray-50/70'>
						<td className='p-4'>
							<Typography variant='small' color='blue-gray' className='font-normal'>
								{name}
							</Typography>
						</td>
						<td className='p-4'>
							<Typography variant='small' color='blue-gray' className='font-normal'>
								{year}
							</Typography>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	) : loading ? (
		<div className='w-3/5'>
			<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
		</div>
	) : (
		<>
			<DialogBody>
				<div className='grid gap-y-6'>
					<Typography variant='h6'>Find constructors who places Xth rank every season</Typography>
					<Input label='Rank' value={value} onChange={(e) => setValue(e.target.value)} />
				</div>
			</DialogBody>
			<DialogFooter className='space-x-2'>
				<Button variant='gradient' color='blue-gray' onClick={handleSearchClicked}>
					search
				</Button>
				<Button variant='outlined' color='blue-gray' onClick={handleOpen}>
					close
				</Button>
			</DialogFooter>
		</>
	);
}
