/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react';

const formInitialState = {
	grandPrix: '',
	position: '',
	name: '',
	laps: '',
	time: '',
	year: '',
};

export default function AddDialog({ open, setOpen, setLoading, setErrFound, setErrOpen }) {
	const [formData, setFormData] = useState(formInitialState);

	const handleClose = () => {
		setFormData(formInitialState);
		setOpen(!open);
	};

	const handleInputChange = (label, value) => {
		setFormData((prevData) => ({
			...prevData,
			[label.charAt(0).toLowerCase() + label.slice(1)]: value,
		}));
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	async function postJSON(data) {
		try {
			const response = await fetch('http://localhost:50000/results/result', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const { result, error } = await response.json();
			if (error) {
				setErrFound(error);
				setErrOpen(true);
			}
			console.log('Success:', result);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	const handleAddResult = async () => {
		setLoading(true);
		await postJSON(formData);
		handleClose();
	};

	return (
		<Dialog open={open} size='xs' handler={handleClose}>
			<div className='flex items-center justify-between'>
				<DialogHeader className='flex flex-col items-start'>
					<Typography className='mb-1' variant='h4'>
						Add new result
					</Typography>
				</DialogHeader>
			</div>
			<DialogBody>
				<div className='grid gap-6'>
					{Object.keys(formData).map((label) => (
						<Input
							key={label}
							label={label.charAt(0).toUpperCase() + label.slice(1)}
							value={formData[label]}
							onChange={(e) => handleInputChange(label, e.target.value)}
						/>
					))}
				</div>
			</DialogBody>
			<DialogFooter className='space-x-2'>
				<Button variant='text' color='gray' onClick={handleClose}>
					cancel
				</Button>
				<Button variant='gradient' color='gray' onClick={handleAddResult}>
					add result
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
