import React, { useState, useEffect } from 'react';
import { Spinner } from '@material-tailwind/react';
import DriversMenu from './components/DriversMenu';
import DriversTable from './components/DriversTable';
import ErrorPopup from '../../components/ErrorPopup';

export default function Results() {
	const [loading, setLoading] = useState(false);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
	const [selectedDriver, setSelectedDriver] = useState('all');
	const [drivers, setDrivers] = useState(false);
	const [errFound, setErrFound] = useState(null);
	const [errOpen, setErrOpen] = useState(false);

	useEffect(() => {
		const getDrivers = async () => {
			setLoading(true);
			try {
				const response = await fetch(`http://localhost:50000/drivers/seasons/${selectedYear}`);
				const { result, error } = await response.json();
				if (error) {
					setErrFound(error);
					setErrOpen(true);
				}
				setDrivers(result);
			} catch (error) {
				console.error('error', error);
			} finally {
				setLoading(false);
			}
		};
		getDrivers();
	}, [selectedYear, selectedDriver]);

	return (
		<div className='container mx-auto p-4'>
			{loading ? (
				<div className='w-3/5'>
					<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
				</div>
			) : (
				<>
					<h1 className='text-2xl font-bold mb-4'>F1 Drivers</h1>
					<DriversMenu props={{ selectedYear, setSelectedYear, selectedDriver, setSelectedDriver }} />
					{drivers && <DriversTable drivers={drivers} />}
				</>
			)}
			{errFound && <ErrorPopup open={errOpen} setOpen={setErrOpen} message={errFound} />}
		</div>
	);
}
