import React from 'react';
import './Movie.css';


function Actor(props){
    return(      
        <div className="card border-secondary mb-3 mr-1 card-border" key={props.actor.id} id="actor-card" >             
            <img className="actor-img" src={props.actor.profile_path ?`https://image.tmdb.org/t/p/w185/${props.actor.profile_path}` : require('../Images/no_photo.PNG') } alt={props.actor.name}/>           
            <div className="card-body">
                <span className="text-style">{props.actor.name}</span>
                <br/>
                <span className="">{props.actor.character}</span>
            </div>
        </div>  
    )  
}
export default Actor;

