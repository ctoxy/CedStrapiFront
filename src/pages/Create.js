import React , {useState, useContext} from 'react';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    /*appel de state description sur les deux etats a un tableau vide*/
    const [description, setDescription ] = useState('');
    /*appel de state file sur les deux etats a un tableau vide*/
    const [file, setFile ] = useState(null);
    console.log("file", file);

    /*appel de state error sur les deux etats a un tableau vide*/
    const [error, setError ] = useState('');

    /* utilisation du context user pour le login  */
    const {user} = useContext(UserContext);
    
    
    /*recueil du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setError('Please log in first')
            return
        }
        if (!description) {
            setError('Please add a description')
            return
        }

        if (!file) {
            setError('Please upload an image')
            return
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify({description}));
        formData.append('files.image', file);

        try {
            const response = await fetch('http://localhost:1337/posts', {
            method: "POST", 
            headers: {
                'Authorization': `Bearer ${user.jwt}`
            },              
            body: formData
        })

            const data = await response.json();
            console.log("data", data);
            
        } catch (err) {
            console.log("Exeption ", err);
            setError(err);
        }


        
    }

    return (
        <div className="Create">
            <h2>Create</h2>

            {error && <p> { error }</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="description"
                    value={description}
                    onChange= {(event) => {
                        setError('');
                        setDescription(event.target.value);
                    }}
                />
                <input 
                    placeholder="add a file"
                    type="file"
                    onChange= {(event) => {
                        setError('');
                        setFile(event.target.files[0])
                    }}
                />
                <button>Submit</button>
            
            </form>
        </div>
    )
}
