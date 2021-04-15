import React , {useState, useContext, useEffect}from 'react';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({history}) => {
    
    /*appel de state email sur les deux etats a un tableau vide*/
    const [email, setEmail ] = useState('');
    /* appel de state login sur les deux etats a un tableau vide*/
    const [password, setPassword ] = useState('');
    
    /* appel de state error sur les deux etats a un tableau vide*/
    const [error, setError ] = useState('');
    /* utilisation du context user pour le login  */
    const {user, setUser} = useContext(UserContext);
    console.log('user', user);

    /* appel du use effect pour la fonction afin de savoir si on est loggé ou pas */

    useEffect(() => {
        if (user) {
          history.push('/');  
        } 
        /* [] cidessous est le second param qui evite une requete permanente tres important */
    }, [user]);
    /*recueil du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:1337/auth/local/register', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },            
                body: JSON.stringify({
                    username: email,
                    email,
                    password
                })
            })

            const data = await response.json();
            console.log("data", data);
            if (data.message) {
                setError(data.message[0].messages[0].message)
                return /*stop execution*/
            }
            
            setUser(data);
            
        } catch (err) {
            console.log("Exeption ", err);
            setError('Something went wron' + err);
        }


        
    }

    return (
        <div className="Signup">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange= {(event) => {
                        setError('');
                        setEmail(event.target.value);
                    }}
                />
                <input 
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange= {(event) => {
                        setError('');
                        setPassword(event.target.value)
                    }}
                />
                <button>SignUp</button>
            
            </form>

            {error && <p> { error }</p>}
        </div>
    )
}