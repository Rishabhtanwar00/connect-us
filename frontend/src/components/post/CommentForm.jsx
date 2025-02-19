import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post.jsx';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState('');
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText('');
				}}
			>
				<textarea
					name='text'
					cols='30'
					rows='5'
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder='leave a comment'
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
