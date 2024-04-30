import Modal from 'react-bootstrap/Modal';
import "./Notification.css";

export const ModalNotification = ({ title, message, handleClose, show }) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className='notification-modal'
        >
            {title &&
                (<Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>)
            }
            <Modal.Body>
                {message ?? "Success"}
            </Modal.Body>
        </Modal>
    );
}