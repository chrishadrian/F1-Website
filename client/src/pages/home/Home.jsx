import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features/Features';

export default function Home() {
	return (
		<div className='container mx-auto p-6 space-y-20'>
			<Hero />
			<Features />
		</div>
	);
}
