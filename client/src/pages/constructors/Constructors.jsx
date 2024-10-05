import React, { useState, useEffect } from 'react';
import { Spinner } from '@material-tailwind/react';
import ConstructorsMenu from './components/ConstructorsMenu';
import ConstructorsTable from './components/ConstructorsTable';
import ErrorPopup from '../../components/ErrorPopup';
import ConstructorsFeatures from './components/ConstructorsFeatures';

export default function Results() {
	const [loading, setLoading] = useState(false);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
	const [selectedConstructor, setSelectedConstructor] = useState('all');
	const [constructors, setConstructors] = useState(false);
	const [errFound, setErrFound] = useState(null);
	const [errOpen, setErrOpen] = useState(false);
	const [statsOpen, setStatsOpen] = useState(false);
	const [stats, setStats] = useState(null);

	useEffect(() => {
		const getConstructorsData = async () => {
			setLoading(true);
			try {
				const response1 = await fetch(`http://localhost:50000/constructors/seasons/${selectedYear}`);
				const { result, error } = await response1.json();
				if (error) {
					setErrFound(error);
					setErrOpen(true);
				}
				setConstructors(result);

				const response2 = await fetch('http://localhost:50000/constructors/totalConstructorRaces');
				const result2 = await response2.json();
				if (error) {
					setErrFound(result2.error);
					setErrOpen(true);
				}
				setStats(result2.result);
			} catch (error) {
				console.error('error', error);
			} finally {
				setLoading(false);
			}
		};
		getConstructorsData();
	}, [selectedYear, selectedConstructor]);

	return (
		<div className='container mx-auto p-4'>
			{loading ? (
				<div className='w-3/5'>
					<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
				</div>
			) : (
				<>
					<h1 className='text-2xl font-bold mb-4'>F1 Constructors</h1>
					<ConstructorsMenu
						props={{
							selectedYear,
							setSelectedYear,
							selectedConstructor,
							setSelectedConstructor,
							setStatsOpen,
						}}
					/>
					{constructors && stats && <ConstructorsTable constructors={constructors} stats={stats} />}
					<ConstructorsFeatures open={statsOpen} setOpen={setStatsOpen} />
				</>
			)}
			{errFound && <ErrorPopup open={errOpen} setOpen={setErrOpen} message={errFound} />}
		</div>
	);
}
