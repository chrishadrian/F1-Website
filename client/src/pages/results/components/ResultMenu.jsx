/* eslint-disable object-curly-newline */
import { Button, Option, Select } from '@material-tailwind/react';
import React, { useMemo } from 'react';

const STARTING_YEAR = 2010;

function getListOfYears() {
	const currentYear = new Date().getFullYear();
	const years = [];
	let startYear = STARTING_YEAR;
	while (startYear <= currentYear) {
		years.push(startYear.toString());
		startYear += 1;
	}
	return years;
}

export default function ResultMenu({ props }) {
	const { selectedYear, setSelectedYear, selectedTrack, setSelectedTrack, tracks, setStatsOpen } = props;
	const yearList = useMemo(() => getListOfYears(), []);
	const tracksWithAll = useMemo(() => ['All', ...tracks], [tracks]);

	const handleButtonClicked = () => {
		setStatsOpen(true);
	};

	return (
		<div className='flex flex-col justify-between w-1/3 lg:flex-row lg:space-x-5'>
			<div className='mb-4'>
				<Select
					value={selectedYear}
					onChange={(year) => {
						setSelectedYear(year);
					}}
					label='Select Year'
				>
					{yearList.map((year) => (
						<Option key={year} value={year}>
							{year}
						</Option>
					))}
				</Select>
			</div>
			<div className='mb-4'>
				<Select value={selectedTrack} onChange={(value) => setSelectedTrack(value)} label='Select Track'>
					{tracksWithAll.map((track) => (
						<Option value={track.toLowerCase()} key={track.toLowerCase()}>
							{track}
						</Option>
					))}
				</Select>
			</div>
			<div className='mb-4'>
				<Button variant='gradient' className='rounded-xl' color='gray' size='md' onClick={handleButtonClicked}>
					Statistics
				</Button>
			</div>
		</div>
	);
}
