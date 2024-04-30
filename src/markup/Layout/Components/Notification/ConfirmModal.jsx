import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Notification.css";

export const ConfirmModal = ({ title, message, closeLabel, acceptLabel, handleAccept, handleDeny, show }) => {

    return (
        <>
            <Modal
                show={show}
                onHide={handleDeny}
                backdrop="static"
                keyboard={false}
                centered
                className='notification-modal'
            >
                {title &&
                    (<Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>)
                }
                <Modal.Body>
                    {message ?? "Modal body"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type='button' onClick={handleDeny}>
                        {closeLabel ?? "Close"}
                    </Button>
                    <Button variant="primary" type='button' onClick={handleAccept}>{acceptLabel ?? "Ok"}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}