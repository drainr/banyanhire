import React from 'react';

// Centralized jobs loader used by dashboards to keep API state logic in one place.
const useJobs = () => {
	const [jobs, setJobs] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState('');

	React.useEffect(() => {
		let isMounted = true;

		// Guard state updates so unmounted components do not receive async updates.
		const loadJobs = async () => {
			try {
				setIsLoading(true);
				setError('');
				const fetchedJobs = await fetchJobs();

				if (isMounted) {
					setJobs(fetchedJobs);
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message || 'Unable to load jobs');
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		loadJobs();

		return () => {
			isMounted = false;
		};
	}, []);

	return { jobs, isLoading, error };
};

export default useJobs;
