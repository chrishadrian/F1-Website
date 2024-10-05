/* eslint-disable object-curly-newline */
import AllRows from './AllRows';
import TrackRows from './TrackRows';

export default function ResultRows({ results, setSelectedTrack, trackMenu }) {
	return trackMenu ? (
		<TrackRows results={results} />
	) : (
		<AllRows results={results} setSelectedTrack={setSelectedTrack} />
	);
}
