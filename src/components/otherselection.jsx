import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const OtherSelection = ({ onTagsChange }) => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsCollection = collection(db, "tags");
                const tagsQuery = query(tagsCollection, orderBy("tag_name"));
                const querySnapshot = await getDocs(tagsQuery);

                if (querySnapshot.empty) {
                    console.error("No tags found in the collection.");
                    return;
                }

                const tagsList = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    if (!data.tag_name) {
                        console.error("Document does not contain 'tag_name' field: ", doc.id);
                        return null;
                    }
                    return data.tag_name;
                }).filter(tag => tag !== null);

                setTags(tagsList);
            } catch (error) {
                console.error("Error fetching tags: ", error);
            }
        };

        fetchTags();
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedTags;

        if (checked) {
            updatedTags = [...selectedTags, value];
            if (value === "other") {
                setShowInput(true);
            }
        } else {
            updatedTags = selectedTags.filter(tag => tag !== value);
            if (value === "other") {
                setShowInput(false);
            }
        }

        setSelectedTags(updatedTags);
        onTagsChange(updatedTags); // Call the callback function with updated tags
    };

    const handleInputChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (newTag.trim() === "") {
            console.error("New tag cannot be empty");
            return;
        }

        try {
            const tagsCollection = collection(db, "tags");
            await addDoc(tagsCollection, { tag_name: newTag });
            setTags(prevTags => [...prevTags, newTag]);
            setSelectedTags(prevTags => [...prevTags, newTag]);
            setNewTag('');
            setShowInput(false);
            console.log("New tag added successfully");
        } catch (error) {
            console.error("Error adding new tag: ", error);
        }
    };

    return (
        <div className="other-selection">
            <form onSubmit={handleFormSubmit}>
                {tags.map((tag, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`tag-${index}`}
                            value={tag}
                            onChange={handleCheckboxChange}
                            checked={selectedTags.includes(tag)}
                        />
                        <label htmlFor={`tag-${index}`}>{tag}</label>
                    </div>
                ))}
                <div>
                    <input
                        type="checkbox"
                        id="tag-other"
                        value="other"
                        onChange={handleCheckboxChange}
                        checked={selectedTags.includes("other")}
                    />
                    <label htmlFor="tag-other">Other</label>
                </div>
                {showInput && (
                    <div>
                        <input
                            type="text"
                            placeholder="Please specify"
                            name="other-input"
                            id="other-input"
                            value={newTag}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Add Tag</button>
                    </div>
                )}
                <div>
                    <button type="button" onClick={() => alert(`Selected tags: ${selectedTags.join(', ')}`)}>
                        Confirm Selection
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OtherSelection;
