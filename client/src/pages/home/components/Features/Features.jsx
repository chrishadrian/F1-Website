import React from 'react';
import { Typography } from '@material-tailwind/react';
import features from './constants';
import CardDefault from '../../../../components/CardDefault';

export default function Features() {
	return (
		<div className='space-y-14'>
			<Typography variant='h2'>Features</Typography>
			<div className='flex-col space-y-14'>
				<div className='flex justify-between'>
					{features.slice(0, 3).map((feature) => (
						<CardDefault
							key={feature.title}
							img={feature.img}
							title={feature.title}
							description={feature.description}
							link={feature.link}
						/>
					))}
				</div>
				<div className='flex justify-between'>
					{features.slice(3).map((feature) => (
						<CardDefault
							key={feature.title}
							img={feature.img}
							title={feature.title}
							description={feature.description}
							link={feature.link}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
