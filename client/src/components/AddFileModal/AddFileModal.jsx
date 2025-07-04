import React, { useState } from "react";
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Modal, Box, Typography, Input, Alert } from '@mui/material';
import axios from 'axios';
import '../../index.css';

const AddFileModal = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState("");
    const [alertType, setAlertType] = useState('success');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const API_URL = 'http://localhost:3001';

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setAlertType('error');
            setResponse('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${API_URL}/api/files/uploadFile`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.status === 201) {
                setAlertType('success');
                setResponse(res.data.message);
                setTimeout(() => setResponse(null), 3000);
            } else {
                setAlertType('error');
                setResponse('Failed to upload file');
            }
        } catch (error) {
            setAlertType('error');
            setResponse('Server error');
            console.error(error);
        }
    };

    return (
        <div className="add-file-modal-body">
            {!open && (
                <button className="add-file-btn" onClick={handleOpen}>
                    <PlusIcon className="icon"/>
                    <span>Upload a File</span>
                </button>
            )}

            {open && (
                <Modal open={open} onClose={handleClose} className="modal-overlay">
                    <Box className="modal-container">
                        <div className="modal-header">
                            <Typography variant="h6" fontWeight={600}>Upload a File</Typography>
                            <button className="modal-close-btn" onClick={handleClose}>
                                <XMarkIcon className="icon" style={{ color: "black" }} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Input 
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                fullWidth
                                margin="dense" // ✅ Fixed MUI issue
                            />
                            <button type="submit" className="submit-btn">Upload File</button>
                        </form>
                        {response && (
                            <Alert severity={alertType} sx={{ mt: 2 }}>
                                {response}
                            </Alert>
                        )}
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default AddFileModal;