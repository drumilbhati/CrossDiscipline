import React, {useState} from "react";
import {PlusIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {Modal, Box, Typography, Input, Alert} from '@mui/material';
import axios from 'axios';
import '../../index.css';
import './AddProjectModal.css';

const AddProjectModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [owner, setOwner] = useState("");
    const [members, setMembers] = useState("");
    const [domains, setDomains] = useState("");
    const [contact, setContact] = useState("");
    const [deadline, setDeadline] = useState(new Date());
    const [response, setResponse] = useState("");
    const [alertType, setAlertType] = useState('success');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const API_URL = 'http://localhost:3001';

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            console.log('Attempting to create a new project...');
            const response = await axios.post(`${API_URL}/api/create-project`, {
                    token,
                    title,
                    projectDescription,
                    owner,
                    members,
                    domains,
                    contact,
                    deadline
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                setAlertType('success');
                setResponse(response.message);
                setTimeout(() => setResponse(null), 3000);
            } else {
                setAlertType('error');
                setResponse('Failed to create project');
            }
        } catch (error) {
            setAlertType('error');
            setResponse('Server error');
            console.error(error);
        }
    }

    return (
        <div className="add-project-modal-body">
            {!open && (
                <button
                    className="add-project-btn"
                    onClick={handleOpen}
                >
                    <PlusIcon className="icon"/>
                    <span>Add a new project</span>
                </button>
            )}

            {open && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    className="modal-overlay"
                >
                    <Box className="modal-container">
                        <div className="modal-header">
                            <Typography variant="h6" fontWeight={600}>Add a new project</Typography>
                            <button
                                className="modal-close-btn"
                                onClick={handleClose}
                            >
                                <XMarkIcon className="icon" style={{color: "black"}}></XMarkIcon>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder="Enter project name"
                                required
                                fullWidth
                                margin="normal"
                            />
                            <Input
                                type="text"
                                id="projectDescription"
                                value={projectDescription}
                                onChange={(e) => {
                                    setProjectDescription(e.target.value)
                                }}
                                placeholder="Describe your project"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                sx={{
                                    alignContent: "baseline"
                                }}
                            />
                            <Input
                                type="text"
                                id="owner"
                                value={owner}
                                onChange={(e) => {
                                    setOwner(e.target.value)
                                }}
                                placeholder="Enter owner's name"
                                required
                                fullWidth
                                margin="normal"
                            />
                            <Input
                                type="text"
                                id="members"
                                value={members}
                                onChange={(e) => {
                                    setMembers(e.target.value)
                                }}
                                placeholder="Enter members' names"
                                required
                                fullWidth
                                margin="normal"
                            />
                            <Input
                                type="text"
                                id="domains"
                                value={domains}
                                onChange={(e) => {
                                    setDomains(e.target.value)
                                }}
                                placeholder="Enter domains you're working on"
                                required
                                fullWidth
                                margin="normal"
                            />
                            <Input
                                type="text"
                                id="contact"
                                value={contact}
                                onChange={(e) => {
                                    setContact(e.target.value)
                                }}
                                placeholder="Enter your contact details"
                                required
                                fullWidth
                                margin="normal"
                            />
                            <Input
                                type="date"
                                id="deadline"
                                value={deadline}
                                onChange={(e) => {
                                    setDeadline(e.target.value)
                                }}
                                placeholder="Enter project deadline"
                                required
                                fullWidth
                                margin="normal"
                            />
                            <button type="submit" className="submit-btn" onClick={handleSubmit}>Add Project</button>
                        </form>
                        {response && (
                            <Alert severity={alertType} sx={{mt: 2}}>
                                {response}
                            </Alert>
                        )}
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default AddProjectModal;