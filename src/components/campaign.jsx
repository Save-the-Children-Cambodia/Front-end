import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { Button, TextField, InputLabel, Input, FormControl } from '@material-ui/core';

const Campaign = () => {
    const [scheduledDate, setScheduledDate] = useState(''); // State to hold scheduled date and time
    const [message, setMessage] = useState(''); // State to hold message text
    const [imageURL, setImageURL] = useState(''); // State to hold image URL
    const [lastSubmission, setLastSubmission] = useState({}); // State to hold the last submission

    const handleSchedule = async () => {
        if (scheduledDate && message) {
            // Check for duplicate submission
            if (scheduledDate === lastSubmission.scheduledDate && message === lastSubmission.message && imageURL === lastSubmission.imageURL) {
                window.alert('Duplicate submission detected. Please modify your input before submitting again.');
                return;
            }

            try {
                // Store the campaign data in Firebase Firestore
                const docRef = await addDoc(collection(db, "Campaign"), {
                    scheduledDate: scheduledDate,
                    message: message,
                    imageURL: imageURL
                });

                console.log("Document written with ID: ", docRef.id);

                // Update last submission state
                setLastSubmission({ scheduledDate, message, imageURL });

                // Alert on successful submission
                window.alert('Broadcast scheduled successfully!');

                // Clear the input fields
                setScheduledDate('');
                setMessage('');
                setImageURL('');
            } catch (error) {
                console.error('Error scheduling broadcast:', error);
            }
        } else {
            console.log('Please select a date and enter a message');
        }
    };

    const handleDateChange = (event) => {
        setScheduledDate(event.target.value); // Update scheduled date and time
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value); // Update message text
    };

    const handleImageURLChange = (event) => {
        setImageURL(event.target.value); // Update image URL
    };

    return (
        <div>
            <h2>Schedule Broadcast</h2>
            <FormControl fullWidth>
                <InputLabel htmlFor="scheduled-date">Select Date and Time</InputLabel>
                <Input
                    id="scheduled-date"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={handleDateChange}
                />
            </FormControl>
            <br /><br />
            <TextField
                id="message"
                label="Enter Message"
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={handleMessageChange}
            />
            <br /><br />
            <FormControl fullWidth>
                <InputLabel htmlFor="image-upload">Input Image URL</InputLabel>
                <Input
                    id="image-upload"
                    type="text"
                    value={imageURL}
                    onChange={handleImageURLChange}
                />
            </FormControl>
            
            <br /><br />
            <Button onClick={handleSchedule} variant="contained" color="primary">
                Submit
            </Button>
        </div>
    );
};

export default Campaign;
