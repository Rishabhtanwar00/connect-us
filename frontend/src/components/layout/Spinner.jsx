import { Fragment } from 'react';
import spinner from './Spinner.gif';

export default () => (
	<Fragment>
		<img
			src={spinner}
			style={{ width: '200px', margin: 'auto', display: 'block' }}
			alt='loading'
		/>
	</Fragment>
);
