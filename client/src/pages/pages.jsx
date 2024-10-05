import Home from './home/Home';
import Standings from './standings/Standings';
import Results from './results/Results';
import Drivers from './drivers/Drivers';
import Constructors from './constructors/Constructors';

const pages = [
	{
		name: 'Home',
		path: '/',
		element: <Home />,
	},
	{
		name: 'Standings',
		path: '/standings',
		element: <Standings />,
	},
	{
		name: 'Results',
		path: '/results',
		element: <Results />,
	},
	{
		name: 'Drivers',
		path: '/drivers',
		element: <Drivers />,
	},
	{
		name: 'Constructors',
		path: '/constructors',
		element: <Constructors />,
	},
];

export default pages;
