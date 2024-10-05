import React, { useEffect, useState } from 'react';
import { Button, Spinner } from '@material-tailwind/react';
import ResultMenu from './components/ResultMenu';
import ResultTable from './components/ResultTable';
import AddDialog from './components/AddDialog';
import RemoveDialog from './components/RemoveDialog';
import ErrorPopup from '../../components/ErrorPopup';
import ResultsStats from './components/ResultsStats';

export default function Results() {
	const [loading, setLoading] = useState(false);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
	const [selectedTrack, setSelectedTrack] = useState('all');
	const [addDialogOpen, setAddDialogOpen] = useState(false);
	const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
	const [results, setResults] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [trackMenu, setTrackMenu] = useState(false);
	const [errFound, setErrFound] = useState(null);
	const [errOpen, setErrOpen] = useState(false);
	const [statsOpen, setStatsOpen] = useState(false);

	const handleAddButtonClicked = () => {
		setAddDialogOpen(true);
	};

	const handleRemoveButtonClicked = () => {
		setRemoveDialogOpen(true);
	};

	useEffect(() => {
		async function getResults() {
			setLoading(true);
			try {
				const url =
					selectedTrack !== 'all'
						? `http://localhost:50000/results/tracks/${selectedTrack}/seasons/${selectedYear}`
						: `http://localhost:50000/results/seasons/${selectedYear}`;
				const response = await fetch(url);
				const { result, error } = await response.json();
				if (error) {
					setErrFound(error);
					setErrOpen(true);
				}
				setResults(result);
				if (selectedTrack === 'all') {
					setTracks(result.map((res) => res.gp));
					setTrackMenu(false);
				} else {
					setTrackMenu(true);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		}

		getResults();
	}, [selectedTrack, selectedYear, addDialogOpen, removeDialogOpen]);

	return (
		<div className='container mx-auto p-4'>
			{loading ? (
				<div className='w-3/5'>
					<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
				</div>
			) : (
				<>
					<h1 className='text-2xl font-bold mb-4'>F1 Results</h1>
					<div className='flex justify-between pr-4'>
						<ResultMenu
							props={{
								selectedYear,
								setSelectedYear,
								selectedTrack,
								setSelectedTrack,
								tracks,
								setStatsOpen,
							}}
						/>
						<div className='w-1/4 h-1/2 flex justify-end space-x-4'>
							<Button
								variant='gradient'
								className='rounded-xl'
								color='red'
								size='md'
								onClick={handleAddButtonClicked}
							>
								Add Result
							</Button>
							<Button
								variant='outlined'
								className='rounded-xl'
								color='red'
								size='md'
								onClick={handleRemoveButtonClicked}
							>
								Remove Result
							</Button>
						</div>
					</div>
					{results && (
						<ResultTable results={results} setSelectedTrack={setSelectedTrack} trackMenu={trackMenu} />
					)}
					<AddDialog
						open={addDialogOpen}
						setOpen={setAddDialogOpen}
						setLoading={setLoading}
						setErrFound={setErrFound}
						setErrOpen={setErrOpen}
					/>
					<RemoveDialog
						open={removeDialogOpen}
						setOpen={setRemoveDialogOpen}
						setLoading={setLoading}
						setErrFound={setErrFound}
						setErrOpen={setErrOpen}
					/>
					<ResultsStats open={statsOpen} setOpen={setStatsOpen} />
				</>
			)}
			{errFound && <ErrorPopup open={errOpen} setOpen={setErrOpen} message={errFound} />}
		</div>
	);
}
