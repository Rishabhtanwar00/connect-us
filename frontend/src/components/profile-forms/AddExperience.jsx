import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile.jsx';
import { connect } from 'react-redux';

const AddExperience = ({ addExperience }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addExperience(formData, navigate);
	};

	return (
		<section className='container'>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						value={title}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						value={company}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onChange={() => {
								setFormData({
									...formData,
									current: !current,
								});
								toggleDisabled(!toDateDisabled);
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={(e) => onChange(e)}
						disabled={toDateDisabled ? 'disabled' : ''}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-dark my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
