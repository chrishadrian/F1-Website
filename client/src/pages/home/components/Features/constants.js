import { standings, results, drivers, constructors } from '../../../../assets';

/* eslint-disable max-len */
const features = [
	{
		img: standings,
		title: 'Standings',
		description:
			"A comprehensive overview of the current season's standings in Formula 1. It includes details on drivers' and constructors' points, race wins, podium finishes, and other key statistics. Stay updated with real-time rankings to track the performance of your favorite teams and drivers throughout the season.",
		link: './standings',
	},
	{
		img: results,
		title: 'Results',
		description:
			'A detailed breakdown of race outcomes in Formula 1. Explore race-by-race results, including lap times, fastest laps, and notable incidents. Relive the excitement of each Grand Prix and review the performance of drivers and teams to analyze the dynamics of the championship as it unfolds.',
		link: './results',
	},
	{
		img: drivers,
		title: 'Drivers',
		description:
			'A dedicated space to discover in-depth information about Formula 1 drivers. Explore individual profiles, career statistics, achievements, and personal details of each driver in any season. Get insights into their racing history, team affiliations, and contributions to the world of Formula 1',
		link: './drivers',
	},
	{
		img: constructors,
		title: 'Constructors',
		description:
			'Dive into the details of each constructor, including their standings, race results, and key team members. Gain a deeper understanding of the team dynamics, technological advancements, and the collaborative effort that goes into competing at the highest level of motorsport.',
		link: './constructors',
	},
];

export default features;
