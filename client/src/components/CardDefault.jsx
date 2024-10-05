import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

// https://www.material-tailwind.com/docs/react/card
export default function CardDefault({ img, title, description, link }) {
	const navigate = useNavigate();
	return (
		<Card className='mt-6 w-96'>
			<CardHeader color='blue-gray' className='relative h-56'>
				<img src={img} alt='card' />
			</CardHeader>
			<CardBody>
				<Typography variant='h5' color='blue-gray' className='mb-2'>
					{title}
				</Typography>
				<Typography>{description}</Typography>
			</CardBody>
			<CardFooter className='pt-0'>
				<Button
					onClick={() => {
						navigate(link);
					}}
				>
					Read More
				</Button>
			</CardFooter>
		</Card>
	);
}
