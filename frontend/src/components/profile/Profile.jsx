import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner.jsx';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile.jsx';
import ProfileTop from './ProfileTop.jsx';
import ProfileAbout from './ProfileAbout.jsx';
import ProfileExperience from './ProfileExperience.jsx';
import ProfileEducation from './ProfileEducation.jsx';
import ProfileGithub from './ProfileGithub.jsx';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const { id } = useParams();

	useEffect(() => {
		getProfileById(id);
	}, []);

	return (
		<div className='container'>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div className=''>
						<Link to='/profiles' className='btn btn-dark'>
							Back To Profiles
						</Link>
						{auth.isAuthenticated &&
							auth.loading === false &&
							auth.user._id === profile.user._id && (
								<Link
									to='/edit-profile'
									className='edit-profile-btn btn btn-dark'
								>
									Edit Profile
								</Link>
							)}
					</div>
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											experience={experience}
										/>
									))}
								</Fragment>
							) : (
								<h4>No Experience Credentials</h4>
							)}
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((education) => (
										<ProfileEducation
											key={education._id}
											education={education}
										/>
									))}
								</Fragment>
							) : (
								<h4>No Education Credentials</h4>
							)}
						</div>
						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</Fragment>
			)}
		</div>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
