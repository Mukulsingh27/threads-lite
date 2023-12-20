import React from 'react';
import Layout from './pages/Layout';
import routes from './pages/routes';
import { useRoutes } from 'react-router-dom';

function App() {
	const routing = useRoutes(routes);

	return (
		<main className="main">
			<Layout>{routing}</Layout>
		</main>
	);
}

export default App;
