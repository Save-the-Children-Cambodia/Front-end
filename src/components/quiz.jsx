import React, { useState } from "react";
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Import Timestamp
import { db } from '../firebaseConfig.js';
import { Button, TextField, InputLabel, Input, FormControl, List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const Quiz = () => {
    const [scheduledDate, setScheduledDate] = useState(''); // State to hold scheduled date and time
    const [title, setTitle] = useState(''); // State to hold the campaign title
    const [question, setQuestion] = useState(''); // State to hold message text
    const [answers, setAnswers] = useState([]); // State to hold the list of answers
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null); // State to hold the index of the correct answer
    const [lastSubmission, setLastSubmission] = useState({}); // State to hold the last submission

    const handleSchedule = async () => {
        if (scheduledDate && title && question && answers.length > 0 && correctAnswerIndex !== null) {
            // Check for duplicate submission
            if (scheduledDate === lastSubmission.scheduledDate && title === lastSubmission.title && question === lastSubmission.question && JSON.stringify(answers) === JSON.stringify(lastSubmission.answers) && correctAnswerIndex === lastSubmission.correctAnswerIndex) {
                window.alert('Duplicate submission detected. Please modify your input before submitting again.');
                return;
            }

            try {
                // Convert scheduledDate to Firestore Timestamp
                const scheduledTimestamp = Timestamp.fromDate(new Date(scheduledDate));
                console.log('Scheduled Timestamp:', scheduledTimestamp);

                // Store the campaign data in Firebase Firestore
                const docRef = await addDoc(collection(db, "Quiz"), {
                    scheduledDate: scheduledTimestamp,
                    title: title,
                    question: question,
                    answers: answers,
                    correctAnswerIndex: correctAnswerIndex,
                    already: 0 // Add the new field with default value
                });

                console.log("Document written with ID: ", docRef.id);

                // Update last submission state
                setLastSubmission({ scheduledDate, title, question, answers, correctAnswerIndex });

                // Alert on successful submission
                window.alert('Broadcast scheduled successfully!');

                // Clear the input fields
                setScheduledDate('');
                setTitle('');
                setQuestion('');
                setAnswers([]);
                setCorrectAnswerIndex(null);
            } catch (error) {
                console.error('Error scheduling broadcast:', error);
            }
        } else {
            console.log('Please select a date, enter a title, question, answers, and choose the correct answer');
        }
    };

    const handleDateChange = (event) => {
        setScheduledDate(event.target.value); // Update scheduled date and time
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value); // Update campaign title
    };

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value); // Update question text
    };

    const handleAnswerChange = (event) => {
        if (event.key === 'Enter' && event.target.value.trim()) {
            setAnswers([...answers, event.target.value.trim()]); // Add the answer to the list
            event.target.value = ''; // Clear the answer input field
        }
    };

    const handleCorrectAnswerChange = (event) => {
        setCorrectAnswerIndex(Number(event.target.value)); // Update the correct answer index
    };

    return (
        <div>
            <h2>Schedule Quiz</h2>
            <FormControl fullWidth>
                <InputLabel htmlFor="scheduled-date"></InputLabel>
                <Input
                    id="scheduled-date"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={handleDateChange}
                />
            </FormControl>
            <br /><br />
            <TextField
                id="title"
                label="Enter Campaign Title"
                fullWidth
                value={title}
                onChange={handleTitleChange}
            />
            <br /><br />
            <TextField
                id="question"
                label="Enter Question"
                multiline
                rows={4}
                fullWidth
                value={question}
                onChange={handleQuestionChange}
            />
            <br /><br />
            <FormControl fullWidth>
                <TextField
                    id="answer"
                    label="Enter Answer and Press Enter"
                    onKeyPress={handleAnswerChange}
                />
            </FormControl>
            <br /><br />
            <List>
                {answers.map((ans, index) => (
                    <ListItem key={index}>
                        <FormControlLabel
                            control={<Radio
                                checked={correctAnswerIndex === index}
                                onChange={handleCorrectAnswerChange}
                                value={index}
                            />}
                            label={ans}
                        />
                    </ListItem>
                ))}
            </List>
            <br /><br />
            <Button onClick={handleSchedule} variant="contained" color="primary">
                Submit
            </Button>
        </div>
    );
};
export default Quiz;