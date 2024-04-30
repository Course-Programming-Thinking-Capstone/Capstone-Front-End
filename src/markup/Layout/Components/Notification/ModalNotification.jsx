import Modal from 'react-bootstrap/Modal';
import "./Notification.css";
import { Stack } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export const ModalNotification = ({ title, message, handleClose, show }) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className='notification-modal'
        >
            {/* {title &&
                (<Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>)
            } */}
            {message &&
                <Modal.Body>
                    <Stack spacing={2} sx={{ fontSize: "1.3rem", color: "rgb(46, 125, 50)" }} direction={"row"} alignItems={"center"} justifyContent={"flex-start"}>
                        <CheckCircleOutline />
                        <p>{message}</p>
                    </Stack>
                </Modal.Body>
            }
        </Modal>
    );
}