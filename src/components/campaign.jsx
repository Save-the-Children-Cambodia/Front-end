import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { Button, TextField, InputLabel, Input, FormControl, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Typography } from '@material-ui/core';
import "../assets/style/campaign.css";

const Campaign = () => {
    const [title, setTitle] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [message, setMessage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [campaigns, setCampaigns] = useState({});
    const [openId, setOpenId] = useState(null); // State to track which campaign group is open

    useEffect(() => {
        const q = query(collection(db, "Campaign"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const groupedData = {};
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const timestampDate = data.scheduledDate ? new Timestamp(data.scheduledDate.seconds, data.scheduledDate.nanoseconds).toDate() : null;
                const campaignData = { id: doc.id, ...data, scheduledDate: timestampDate };
                groupedData[data.title] = groupedData[data.title] ? [...groupedData[data.title], campaignData] : [campaignData];
            });
            setCampaigns(groupedData);
        });

        return () => unsubscribe();
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDateChange = (event) => {
        setScheduledDate(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleImageURLChange = (event) => {
        setImageURL(event.target.value);
    };

    const handleSchedule = async () => {
        if (title && scheduledDate && message) {
            const scheduledTimestamp = Timestamp.fromDate(new Date(scheduledDate));
            try {
                await addDoc(collection(db, "Campaign"), {
                    title: title,
                    scheduledDate: scheduledTimestamp,
                    message: message,
                    imageURL: imageURL,
                    already: false
                });
                window.alert('Broadcast scheduled successfully!');
                setTitle('');
                setScheduledDate('');
                setMessage('');
                setImageURL('');
            } catch (error) {
                console.error('Error scheduling broadcast:', error);
            }
        } else {
            console.log('Please ensure all fields are filled.');
        }
    };

    const toggleDetails = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Scheduled Campaigns
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(campaigns).map((title) => (
                                <>
                                    <TableRow key={title} hover onClick={() => toggleDetails(title)}>
                                        <TableCell>{title}</TableCell>
                                    </TableRow>
                                    <Collapse in={openId === title} timeout="auto" unmountOnExit>
                                        <Table size="small" aria-label="details">
                                            <TableBody>
                                                {campaigns[title].map((campaign) => (
                                                    <TableRow key={campaign.id}>
                                                        <TableCell component="th" scope="row">
                                                            {campaign.message}
                                                        </TableCell>
                                                        <TableCell>{campaign.scheduledDate.toLocaleString()}</TableCell>
                                                        <TableCell>{campaign.imageURL}</TableCell>
                                                        <TableCell>{campaign.already ? 1 : 0}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Collapse>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Schedule New Broadcast
                </Typography>
                <Paper style={{ padding: 16 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="title">Campaign Title</InputLabel>
                        <Input id="title" type="text" value={title} onChange={handleTitleChange} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Input id="scheduled-date" type="datetime-local" value={scheduledDate} onChange={handleDateChange} />
                    </FormControl>
                    <TextField
                        id="message"
                        label="Enter Message"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="image-upload">Input Image URL</InputLabel>
                        <Input id="image-upload" type="text" value={imageURL} onChange={handleImageURLChange} />
                    </FormControl>
                    <Button onClick={handleSchedule} variant="contained" color="primary" style={{ marginTop: 16 }}>
                        Submit
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Campaign;
