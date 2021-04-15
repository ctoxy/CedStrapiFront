import React , {useState}from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    
    /*appel de state email sur les deux etats a un tableau vide*/
    const [email, setEmail ] = useState('');
    /*appel de state login sur les deux etats a un tableau vide*/
    const [password, setPassword ] = useState('');
    
    /*appel de state error sur les deux etats a un tableau vide*/
    const [error, setError ] = useState('');
    
    
    /*recueil du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:1337/auth/local/', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },            
                body: JSON.stringify({
                    identifier:email,
                    password
                })
            })

            const data = await response.json();
            console.log("data", data);
            if (data.message) {
                setError(data.message[0].messages[0].message)
                return /*stop execution*/
            }
            
            
        } catch (err) {
            console.log("Exeption ", err);
            setError('Something went wron' + err);
        }


        
    }

    return (
        <div className="Login">
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
                <button>Login</button>
            
            </form>

            {error && <p> { error }</p>}
        </div>
    )
}