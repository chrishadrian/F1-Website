/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Spinner } from '@material-tailwind/react';

// https://www.material-tailwind.com/docs/react/dialog
export default function ResultsStats({ open, setOpen }) {
	const handleOpen = () => setOpen(!open);
	const [lapTime, setLapTime] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getResults() {
			setLoading(true);
			try {
				const response = await fetch('http://localhost:50000/results/maxAvgLapTime');
				const { result } = await response.json();
				setLapTime(result[0].max_average_laptime);
			} catch (error) {
				console.error('Error fetching data:', error.message);
			} finally {
				setOpen(false);
				setLoading(false);
			}
		}

		if (!lapTime) {
			getResults();
		}
	}, [lapTime, setOpen]);

	return (
		<Dialog open={open} size='xs' handler={handleOpen}>
			{loading ? (
				<div className='w-3/5'>
					<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
				</div>
			) : (
				<>
					<div className='flex items-center justify-between'>
						<DialogHeader className='flex flex-col items-start'>
							{' '}
							<Typography className='mb-1' variant='h4'>
								Results Statistics
							</Typography>
						</DialogHeader>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='mr-3 h-5 w-5'
							onClick={handleOpen}
						>
							<path
								fillRule='evenodd'
								d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06
							12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94
							12 5.47 6.53a.75.75 0 010-1.06z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
					<DialogBody>
						<div className='grid gap-6'>
							<Typography className='-mb-1' color='blue-gray' variant='paragraph'>
								<strong className='mr-2'>Fastest Racetime Average:</strong>
								{lapTime}
							</Typography>
						</div>
					</DialogBody>
					<DialogFooter className='space-x-2'>
						<Button variant='gradient' color='blue-gray' onClick={handleOpen}>
							close
						</Button>
					</DialogFooter>
				</>
			)}
		</Dialog>
	);
}
