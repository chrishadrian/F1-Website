import React from 'react';
import { Button, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function FeaturesMenu({ setWinsFeature, setRankFeature, setUpdateFeature, handleOpen }) {
	return (
		<>
			<DialogBody>
				<div className='grid gap-y-8'>
					<div className='flex h-4 hover:cursor-pointer space-x-1' onClick={() => setWinsFeature(true)}>
						<Typography className='-mb-1' color='blue-gray' variant='small'>
							Constructors with certain wins
						</Typography>
						<ArrowRightIcon height='1.3rem' color='black' />
					</div>
					<div className='flex h-4 hover:cursor-pointer space-x-1' onClick={() => setRankFeature(true)}>
						<Typography className='-mb-1' color='blue-gray' variant='small'>
							Constructors with certain rank
						</Typography>
						<ArrowRightIcon height='1.3rem' color='black' />
					</div>
					<div className='flex h-4 hover:cursor-pointer space-x-1' onClick={() => setUpdateFeature(true)}>
						<Typography className='-mb-1' color='blue-gray' variant='small'>
							Update constructors data
						</Typography>
						<ArrowRightIcon height='1.3rem' color='black' />
					</div>
				</div>
			</DialogBody>
			<DialogFooter className='space-x-2'>
				<Button variant='outlined' color='blue-gray' onClick={handleOpen}>
					close
				</Button>
			</DialogFooter>
		</>
	);
}
