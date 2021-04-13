import React , {useState, useEffect}from 'react';
import Post from '../components/Post';

// eslint-disable-next-line import/no-anonymous-default-export
export default({match, history}) => {
    /*au lieu de prop recupération de l id*/
    const {id}= match.params;
    console.log("id", id);

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    /*methode DELETE */
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:1337/posts/${id}`, {
            method: 'DELETE'
        })
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        history.push('/')

    }
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:1337/posts/${id}`);
            const data = await response.json();

            console.log("data", data);
            setPost(data);
            setLoading(false);
        }
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
                            <button onClick={handleDelete}>Delete the post</button>
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