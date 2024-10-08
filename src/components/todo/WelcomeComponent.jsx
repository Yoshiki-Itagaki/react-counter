import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent() {

    const {username} = useParams();

    const authContext = useAuth();

    const [message, setMessage] = useState(null);

    function callHelloWorldRestApi(){        
        retrieveHelloWorldPathVariable('King', authContext.token)
            .then(response => {
                successfulResponse(response);
            })
            .catch(error => {
                errorResponse(error);
            })
            .finally(() => {
                console.log('cleanup');
            })
    }

    function successfulResponse(response){
        setMessage(response.data.message);
    }
    function errorResponse(error){
        setMessage(error.data);
    }

    return (
        <div> 
            <h1>Welcome {username}</h1>            
            <div className='WelcomeComponent'>
                Manage Your Todos - <Link to='/todos'>Go Ahead</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>Call Hello World REST API</button>
            </div>
            <div className='text-info'>{message}</div>
        </div>       
    )
}
