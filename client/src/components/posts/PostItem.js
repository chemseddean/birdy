import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'


const PostItem = ({ auth,
     addLike, 
     removeLike,
     deletePost,
    post: { _id, text, user, name, likes, comments, date},
    showActions
  }) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <img
              className="round-img"
              src="https://arboresens.fr/assets/images/charte-SU-2.jpg"
              alt=""
            />
              <h4>{name}</h4>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="DD/MM/YYYY">
                    {date}
                    </Moment>
            </p>

            {showActions && 
            <Fragment>
              <button   
            onClick={e=> addLike(_id)}   
            type="button"
            className="btn btn-light">
            <i className="fas fa-thumbs-up"/>{' '}
            <span>{likes.length}</span>
            </button>

            <button    
            onClick={e=> removeLike(_id)}  
            type="button"
            className="btn btn-light">
            <i className="fas fa-thumbs-down"/> 
            </button>

            <Link to={`/posts/${_id}`} className="btn btn-primary">
                Comments {comments.length> 0 && (<span className='comment-count'> {comments.length} </span>)}
            </Link>

            {!auth.loading && name === auth.user.username && (
                    <button   
                    onClick={e=>deletePost(_id)}   
                    type="button"
                    className="btn btn-danger">
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </Fragment>
              }
            
             
          </div>
        </div>
    )
}

PostItem.defaultProps = {
  showActions : true,
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost})(PostItem)
