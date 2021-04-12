import React from 'react';
const post = {
    "id": 1,
    "description": "image 1 ",
    "likes": 2,
    "author": null,
    "published_at": "2021-04-08T15:07:27.802Z",
    "created_at": "2021-04-08T15:02:50.455Z",
    "updated_at": "2021-04-08T15:07:27.825Z",
    "image": {
        "url": "/uploads/Capture_358e809b5a.PNG",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2021-04-08T15:02:11.147Z",
        "updated_at": "2021-04-08T15:02:11.167Z"
    },
};
const API_URL = 'http://localhost:1337';
const formatImageUrl = (url) => `${API_URL}${url}`;


// eslint-disable-next-line import/no-anonymous-default-export
export default ({likes, description, url}) => {
   

    return (
        <div className="Post">
            <img className="Post__Image" src={formatImageUrl(url)} alt="default"/>
             <h4> {description} </h4>
             <div>
                <span>likes: {likes}</span>
             </div>
             
        </div>
        
    )
    
}