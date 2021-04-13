import React , {useState}from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    /*appel de state description sur les deux etats a un tableau vide*/
    const [description, setDescription ] = useState('');
    /*appel de state file sur les deux etats a un tableau vide*/
    const [file, setFile ] = useState(null);
    console.log("file", file);
    
    /*recueil du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('data', JSON.stringify({description}));
        formData.append('files.image', file);


        const response = await fetch('http://localhost:1337/posts', {
            method: "POST",            
            body: formData
        })

        const data = await response.json();
        console.log("data", data);
    }

    return (
        <div className="Create">
            <h2>Create</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="description"
                    value={description}
                    onChange= {(event) => setDescription(event.target.value)}
                />
                <input 
                    placeholder="add a file"
                    type="file"
                    onChange= {(event) => setFile(event.target.files[0])}
                />
                <button>Submit</button>
            
            </form>
        </div>
    )
}