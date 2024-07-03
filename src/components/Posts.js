
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, updatePost } from "../redux/postsSlice";

export default function Posts() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const posts_state = useSelector((state) => state.posts.items );
    // in use selector, it will look for the reducer that called 'posts' in store.js file,
    // then it will find its own Slice that called postsSlice,
    // then will go to the postsSlice.js file for looking for items to grap everything inside it .

    const [isedit, setIsedit] = useState(false);
    const [id, setId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    
    let titileFin = document.getElementsByClassName('titleF');
    let descDin = document.getElementsByClassName('descD');

    console.log('(Posts.js)', title, description);


    return (
        <div>
            <div className="form">
                    <input 
                        type="text" 
                        className="titleF"
                        // vlaue={titileFin}
                        placeholder="Enter Post Title"
                        onChange={(e) => setTitle(e.target.value)}
                        
                    />
                    
                    <input 
                        type="text" 
                        className="descD"
                        placeholder="Enter Post Desc"
                        onChange={(e) => {setDescription(e.target.value)} }
                        vlaue = {descDin}
                    />

                    <button className="addpost" onClick={ () => {
                        if (title == "" || description == "") {
                           alert('Please write a post first');
                        } else {
                            dispatch(addPost({id: new Date().valueOf() + 1, title, description}));
                            setTitle("");
                            document.getElementsByClassName('titleF').innerHTML = "";
                            console.log('(Posts.js) title:', title);
                            setDescription("");
                            descDin=0;
                            console.log('(Posts.js) description:', description);
                        };

                        }
                                
                    }>
                        Add Post
                    </button>
            </div>

            <div className="posts">
                {posts_state.length > 0  ? posts_state.map(post => 
                    <div key={post.id} className="post">
                            {console.log('(Posts.js) post id:', post)}
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                            
                                <button className="editpost" onClick={() => {
                                        setIsedit(true);
                                        setId(post.id);
                                        }}>Edit</button>
                                
                                <button className="deletepost" onClick={() => {
                                                        console.log('(Posts.js) post',post);
                                                        console.log('(Posts.js) post.id',post.id);
                                                        
                                                        dispatch(deletePost({id: post.id}))
                                                        }}>Delete</button>
                                <br/>
                                {isedit && id == post.id && (
                                    <>
                                        <input type='text' placeholder='update Title' 
                                            onChange={(e) => setUpdatedTitle(e.target.value)}
                                        />
                                        <input type='text' placeholder='update Description' 
                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                        />
                                        <button onClick={() => {
                                            dispatch(updatePost({id: post.id, 
                                                                title: updatedTitle, 
                                                                description: updatedDescription}));
                                            setIsedit(false);
                                        }}>Update</button>
                                    </>
                                )
                                }

                     </div>): 'There is no Posts' }

            </div>
        </div>
    );
};