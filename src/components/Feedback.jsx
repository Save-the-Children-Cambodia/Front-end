import React from "react";
import '../assets/style/Feedbacks.css';
import linkedin from '../assets/img/linkedin.svg';
import facebook from '../assets/img/facebook.svg';
import youtube from '../assets/img/youtube.svg';
import x from '../assets/img/x-twitter.svg';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


const Feedback = () => {
    return (
        <div className="container-feedback">
            <div className="container-feedback-about">
                <p className="feedback-title">About Me</p>
                <p className="describe-aboutme">Welcome to the Positive Parenting website, a comprehensive resource dedicated to fostering a nurturing and supportive environment for children. Our mission is to help parents and caregivers create a loving, warm, and kind atmosphere where children can thrive.
                </p>
                <div className="container-feedback-icon">
                    <img src={facebook} alt="" />
                    <img src={youtube} alt="" />
                    <img src={x} alt=""/>
                    <img src={linkedin} alt="" />
                </div>
            </div>
        <div className="container-feedback-report class-feedback">
            <p className="feedback-title">FeedBack</p>
            <Stack className="hey-hey-hey">
                <div className="container-feedback-input-identify">
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => 
                        <TextField 
                            {...params} 
                            label="Gmail" 
                            type="email"
                        />}
                    />
                    <p className="or-or-or">ឬ</p>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="លេខទូរស័ព្ទ"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                </div>
            </Stack>
            <Stack className="hey-hey-hey">
                <div className="container-feedback-input-identify">
                    <Autocomplete
                        id="free-solo-demoddd"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => 
                        <TextField 
                            {...params} 
                            label="Gmail" 
                            type="email"
                        />}
                    />
                </div>
            </Stack>
        </div>
        </div>
    );
}

const top100Films = [
    
    // { title: 'Pulp Fiction', year: 1994 },
    // {
    //   title: 'The Lord of the Rings: The Return of the King',
    //   year: 2003,
    // }
  ];

export default Feedback