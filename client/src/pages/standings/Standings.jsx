import React, { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import StandingMenus from './components/StandingMenus';
import StandingTable from './components/StandingTable';
import ErrorPopup from '../../components/ErrorPopup';

export default function Standings() {
	const [loading, setLoading] = useState(false);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
	const [selectedStanding, setSelectedStanding] = useState('drivers');
	const [standings, setStandings] = useState(null);
	const [errFound, setErrFound] = useState(null);
	const [errOpen, setErrOpen] = useState(false);

	useEffect(() => {
		const getStandingsBySeason = async () => {
			setLoading(true);
			try {
				const url = `http://localhost:50000/standings/${selectedStanding}/${selectedYear}`;
				const response = await fetch(url);
				const { result, error } = await response.json();
				if (error) {
					setErrFound(error);
					setErrOpen(true);
				}
				setStandings(result);
			} catch (error) {
				console.error('error', error);
			} finally {
				setLoading(false);
			}
		};

		getStandingsBySeason();
	}, [selectedYear, selectedStanding]);

	return (
		<div className='container mx-auto p-4'>
			{loading ? (
				<div className='w-3/5'>
					<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
				</div>
			) : (
				<>
					<h1 className='text-2xl font-bold mb-4'>F1 Standings</h1>
					<StandingMenus props={{ selectedYear, setSelectedYear, selectedStanding, setSelectedStanding }} />
					{standings && <StandingTable selectedStanding={selectedStanding} standings={standings} />}
					{errFound && <ErrorPopup open={errOpen} setOpen={setErrOpen} message={errFound} />}
				</>
			)}
		</div>
	);
}
