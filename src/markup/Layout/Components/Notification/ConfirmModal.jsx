import Modal from 'react-bootstrap/Modal';
import "./Notification.css";
import { Button, Stack } from '@mui/material';

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
                {/* {title &&
                    (<Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>)
                } */}
                {/* <Modal.Body>
                    {message ?? "Modal body"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type='button' onClick={handleDeny}>
                        {closeLabel ?? "Close"}
                    </Button>
                    <Button variant="primary" type='button' onClick={handleAccept}>{acceptLabel ?? "Ok"}</Button>
                </Modal.Footer> */}

                {message && (
                    <>
                        <Modal.Body>
                            <Stack
                                spacing={2}
                                alignContent="center"
                                justifyContent="center"
                                direction="column"
                                sx={{ fontSize: "1.3rem", color: "#6DCE63", textAlign: 'center' }}
                            >
                                <p>{message}</p>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                sx={{ fontSize: "1rem", margin: "2rem 4rem 0" }}
                            >
                                <Button variant='outlined' color='error' onClick={handleDeny}>
                                    {closeLabel ?? "Close"}
                                </Button>
                                <Button variant='contained' color='primary' onClick={handleAccept}>
                                    {acceptLabel ?? "Ok"}
                                </Button>
                            </Stack>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
}