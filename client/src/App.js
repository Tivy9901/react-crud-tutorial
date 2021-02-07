import React, {useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
    const [movieName,setMovieName]=useState("")
    const [review,setReview]=useState("")
    const [movieReviewList,setMovieList]=useState([])
    const [newReview,setNewReview]=useState("")

    //get data and print
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/get").then((res)=>{
            // console.log(Response.data);
            setMovieList(res.data);
        });
    });
    //call submit btn
    const submitReview = () => {
        
        //make axios request
        //Axios.post('url/index.js(post link)',{<index.js-var>"<App.js-var>"})
        Axios.post('http://localhost:3001/api/insert',{movieName: movieName, movieReview:review});
        setMovieList([...movieReviewList,{movieName:movieName,movieReview:review},]);
        // .then(()=>{
        //     // alert("Successfully insert");
        // })
    }
    
    const deleteReview = (movie) => {//-> movie (declare var)
        Axios.delete(`http://localhost:3001/api/delete/${movie}`); 
    }
    const updateReview = (movie) => {//-> movie (declare var)
        Axios.put("http://localhost:3001/api/update",{movieName:movie,movieReview:newReview});
        setNewReview("");//clear input after update 
    }
    

    return ( 
        <div className="App">
            <h1>CRUD APPLICATION</h1>
            <div className="form">
                <label>Movie Name:</label>
                <input type="text" name="movieName" onChange={(e)=>{setMovieName(e.target.value)}}/>
                <label>Review:</label>
                <input type="text" name="review" onChange={(e)=>{setReview(e.target.value)}}/>
                <button onClick={submitReview}>Submit</button>
                {movieReviewList.map((val)=>{
                    return(
                        <div className="card">
                            <h1>Movie Name: {val.movieName}</h1>
                            <p>Movie Review: {val.movieReview}</p>

                            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
                            <input type="text" id="updateInput" onChange={(e)=>{setNewReview(e.target.value)}}></input>
                            <button onClick={() => {updateReview(val.movieName)}}>Update</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default App;