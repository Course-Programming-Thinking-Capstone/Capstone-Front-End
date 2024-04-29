import { Spinner } from "react-bootstrap"

export const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center py-5">
            <Spinner
                animation="border"
                variant="success"
                className="custom-spinner"
            />
        </div>
    )
}