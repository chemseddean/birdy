import React, { Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { removeComment } from '../../actions/post'


const CommentItem = ({
    postId, 
    comment: {_id, text, name, user, date},
    auth,
    deleteComment
}) => (
<div className="post bg-white p-1 my-1">
        <div>
            <img
              className="round-img"
                src="https://arboresens.fr/assets/images/charte-SU-2.jpg"
              alt=""
            />
            <h4>{name}</h4>
        </div>
        <p className="my-1">{text}</p>
        <p className="post-date">
                Posted on 
                <Moment format="DD/MM/YYYY">
                    {date}
                </Moment>
        </p>
        {!auth.loading && name === auth.user.username && false && (
            <button   
            onClick={e=> removeComment(postId, _id)}   
            type="button"
            className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
</div>

)

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
