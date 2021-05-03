import React , {useState, useEffect, useContext}from 'react';
import Post from '../components/Post';
import {UserContext} from '../context/UserContext';
import {LikesContext} from '../context/LikesContext';


// eslint-disable-next-line import/no-anonymous-default-export
export default({match, history}) => {
    /*au lieu de prop recupération de l id*/
    const {id}= match.params;
    console.log("id", id);

    const {user, setUser} = useContext(UserContext);
    console.log("user", user);
    console.log("setUser", setUser);

    /*appel du likecontext */
    const {likesGiven, reloader} = useContext(LikesContext)
    
    const isPostAlreadyLiked = (() => {
        return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
    })()

    console.log("isPostAlreadyLiked", isPostAlreadyLiked)

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);

    /*Use for the edit form */
    const [description, setDescription] = useState('');

    /*methode fetch data */
    const fetchPost = async () => {
        const response = await fetch(`http://localhost:1337/posts/${id}`);
        const data = await response.json();

        console.log("data", data);
        setPost(data);
        setDescription(data.description);
        setLoading(false);
    }

    /*methode DELETE */
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:1337/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.jwt}`
            },
        })
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        history.push('/')

    }

    /*methode Update*/
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        console.log("handleEditSubmit");

        const response = await fetch(`http://localhost:1337/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            },
            body: JSON.stringify({
                description
            })
        })
        const data = await response.json();
        /*permet de rafraichir apres modif */
        fetchPost();

        console.log("handleEditSubmit data", data);

    }
    const handleLike = async () => {
        try{
            const response = await fetch('http://localhost:1337/likes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: parseInt(id)
                })
            })
            fetchPost()
            
        } catch(err){
            console.log("Exception ", err)
        }
    }

    const handleRemoveLike = async () => {
        try{
            const response = await fetch(`http://localhost:1337/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
            fetchPost()
            
        } catch(err){
            console.log("Exception ", err)
        }
    }

    
    useEffect(() => {
        
        fetchPost();
        /* [] cidessous est le second param qui evite une requete permanente tres important */
    }, []);
    return(
        <div className='SinglePost'>
            {loading &&
                <p>Loading ...</p>
            }
            {!loading &&
                <React.Fragment>
                    {post.id &&
                        <React.Fragment>
                            <Post
                            description={post.description}
                            url={post.image && post.image.url}
                            likes= {post.likes}
                            />

                            {user &&
                                <React.Fragment>  
                                    {isPostAlreadyLiked && 
                                        <button onClick={handleRemoveLike}>Remove Like</button>
                                    }

                                    {!isPostAlreadyLiked &&
                                        <button onClick={handleLike}>Like</button>
                                    }                                  
                                                                         
                                </React.Fragment>
                            }
                            
                            
                            
                            {user && user.user && post && post.author && post.author.id === user.user.id &&
                                <React.Fragment>
                                    <button onClick={handleDelete}>Delete the post</button>
                                    <button onClick={() => setEdit(true)}>Edit the post</button>
                                {edit && 
                                    <form onSubmit={handleEditSubmit}>
                                        <input
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            placeholder="New Description"
                                        />
                                        <button >Confirm</button>
                                    
                                    </form>                                
                                }
                                </React.Fragment>
                            }
                            
                        </React.Fragment>
                    }
                    {!post.id &&
                        <p>404- not found</p>
                    }
                </React.Fragment> 
            }
            
        </div>
    )
}