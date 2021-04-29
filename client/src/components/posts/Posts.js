import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading }}) => {
    useEffect(() => getPosts(), [])
    const [listing, setList] = useState(getPosts)
    useEffect(() => setList(posts), [posts])
    console.log("list to return ")
    console.log(listing);
    return !loading && (
        <section className="standard">
            <h1 className="large text-primary">Posts</h1>
                <p className="lead">
               <i className="fa fa-user"></i> Welcome to Birdy 
                </p>
                <input placeholder="searching" className="search"
                    onChange={(e) => {
                        var value = e.target.value
                        if (value == '')
                            return setList(posts)
                        setList(searching(posts, value))
                    }}>
                </input>
                <PostForm/>
            <div className="posts">
            {listing.length > 0 ?
                posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))
            :
                <h2 style={{minWidth: '566px' }}>0 résultas de recherche</h2>
            }
             
            </div>
        </section>
    )
}

function searching(listInput, substring) {
    const regex = new RegExp("^" + substring.toLowerCase() + ".*$");
    var ret = listInput.filter(item => regex.test(item.name.toLowerCase()))
    // alert(ret)
    
    return ret
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
     post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
