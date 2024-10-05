import React, { useState } from 'react';
import { Typography, Input, DialogBody, DialogFooter, Button, Spinner } from '@material-tailwind/react';

export default function UpdateFeature({ handleOpen }) {
	const [principal, setPrincipal] = useState('');
	const [chips, setChips] = useState('');
	const [cname, setCName] = useState('');
	const [updated, setUpdated] = useState(false);
	const [loading, setLoading] = useState(false);

	async function updatePUT(data) {
		try {
			const response = await fetch('http://localhost:50000/constructors/team', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const { result } = await response.json();
			setUpdated(result);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	const handleSearchClicked = async () => {
		setLoading(true);
		try {
			const data = {
				newTeamPrincipal: principal,
				newChampionships: chips,
				name: cname,
			};
			await updatePUT(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return updated ? (
		<DialogBody>
			<div className='grid gap-y-6'>
				<Typography variant='paragraph'>
					Success updating constructor:
					<p className='font-bold'>{cname}</p>
				</Typography>
			</div>
		</DialogBody>
	) : loading ? (
		<div className='w-3/5'>
			<Spinner className='h-16 w-16 text-gray-900/50 mx-auto' />
		</div>
	) : (
		<>
			<DialogBody>
				<div className='grid gap-y-6'>
					<Typography variant='h6'>Update constructors</Typography>
					<Input label='Team Principal' value={principal} onChange={(e) => setPrincipal(e.target.value)} />
					<Input label='Championships' value={chips} onChange={(e) => setChips(e.target.value)} />
					<Input label='Constructors Name' value={cname} onChange={(e) => setCName(e.target.value)} />
				</div>
			</DialogBody>
			<DialogFooter className='space-x-2'>
				<Button variant='gradient' color='blue-gray' onClick={handleSearchClicked}>
					update
				</Button>
				<Button variant='outlined' color='blue-gray' onClick={handleOpen}>
					close
				</Button>
			</DialogFooter>
		</>
	);
}
