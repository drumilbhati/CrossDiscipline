import React, {useState} from "react";
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Modal, Box, Typography, Input } from '@mui/material';
import './AddProjectModal.css';

const AddProjectModal = () => {
    const [open, setOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Project added: ", { projectName, projectDescription });
        handleClose();
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
                                <XMarkIcon className="icon" style={{ color: "black"}}></XMarkIcon>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Input 
                                type="text"
                                id="projectName"
                                value={projectName}
                                onChange={(e) => {setProjectName(e.target.value)}}
                                placeholder="Enter project name"
                                required
                                fullWidth
                                margin="dense"
                            />
                            <Input
                                type="text"
                                id="projectDescription"
                                value={projectDescription}
                                onChange={(e) => {setProjectDescription(e.target.value)}}
                                placeholder="Describe your project"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                sx={{
                                    alignContent:"baseline"
                                }}
                            />
                            <button type="submit" className="submit-btn">Add Project</button>
                        </form>
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default AddProjectModal;