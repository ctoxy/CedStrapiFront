import React , {useState, useEffect} from 'react';
import Post from '../components/Post';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
/*appel de state sur les deux etats a un tableau vide*/
  const [posts, setPosts ] = useState([]);
  /*appel de setstate pour popularité les poste sur un echaantillon ici mockPosts en second param tableau vide pour eviter loop infini */
  useEffect( () => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts')
      const data = await response.json()
      setPosts(data)
    }
    getPosts()
  },[])

  return (
    <div className="Home">
     { posts.map( post => (
      <Post
        likes={post.likes}
        description={post.description}
        url={post.image && post.image.url}
      />
     ))}
      
    
    </div>
        
      
  );
}