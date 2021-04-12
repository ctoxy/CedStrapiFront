import logo from './logo.svg';
import './App.css'
import Post from './components/Post';


const post = {
  likes:20,
  description: "the changed description",
  image: {
    url: "/uploads/Capture_358e809b5a.PNG"
  }
}
function App() {
  return (
    <div className="App">
      <Post
        likes={post.likes}
        description={post.description}
        url={post.image && post.image.url}
      />
    
    </div>
        
      
  );
}

export default App;
