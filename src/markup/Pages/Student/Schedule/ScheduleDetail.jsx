import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { LoadingSpinner } from "../../../Layout/Components/LoadingSpinner";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { getCLassById } from "../../../../helper/apis/class/class";

const StudentScheduleDetail = ({ handleBack, classId }) => {

    //useState
    const [isLoading, setIsLoading] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [studyDay, setStudyDay] = useState("");

    const navigate = useNavigate();

    if (!classId) {
        navigate("/not-found");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getCLassById(classId);
                if (data === null) {
                    throw Error();
                }
                setSchedule(data);
                const formatStudyDayResult = formatStudyday(data?.studyDay);
                setStudyDay(formatStudyDayResult);
            } catch (err) {
                navigate("/not-found");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [classId, navigate])

    const formatStudyday = (input) => {
        if (!Array.isArray(input)) {
            return "";
        }

        const result = input.join(', ');
        return result;
    }

    return (
        <div className="teacher-classes">
            <div className="header d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center">
                    <div>
                        <h5 className="mb">Schedule</h5>
                        <hr />
                    </div>
                    <i class="fa-regular fa-calendar"></i>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        aria-label="Back"
                        startIcon={<KeyboardBackspace />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </div>
            </div>

            <ToastContainer />

            <div className="teacher-classes-content py-3">
                <h5 className="schedule-detail-header">Schedule detail</h5>
                {isLoading ? (<LoadingSpinner />) :
                    (<>
                        {schedule === null ? (
                            <p>Schedule for this date is empty</p>
                        ) : (
                            <>
                                <Grid container spacing={2} className="mx-2 my-2">
                                    <Grid item xs={2} className="schedule-detail-title">
                                        Day
                                    </Grid>
                                    <Grid item xs={4}>
                                        {studyDay}
                                    </Grid>
                                    <Grid item xs={1} className="schedule-detail-title">
                                        Time
                                    </Grid>
                                    <Grid item xs={5}>
                                        {schedule?.startSlot} - {schedule?.endSlot}
                                    </Grid>
                                    <Grid item xs={2} className="schedule-detail-title">
                                        Slot
                                    </Grid>
                                    <Grid item xs={4}>
                                        {schedule?.slotNumber}
                                    </Grid>
                                    <Grid item xs={1} className="schedule-detail-title">
                                        Class
                                    </Grid>
                                    <Grid item xs={5}>
                                        {schedule?.classCode}
                                    </Grid>
                                    <Grid item xs={2} className="schedule-detail-title">
                                        Course
                                    </Grid>
                                    <Grid item xs={10}>
                                        {schedule?.courseName}
                                    </Grid>
                                    <Grid item xs={2} className="schedule-detail-title">
                                        Instructor
                                    </Grid>
                                    <Grid item xs={10}>
                                        {schedule?.teacherName}
                                    </Grid>
                                    <Grid item xs={2} className="schedule-detail-title">
                                        Online room
                                    </Grid>
                                    <Grid item xs={10}>
                                        <a href={schedule?.roomUrl}
                                            rel="noreferrer" target="_blank"
                                            type="button" alt=""
                                        >
                                            Room url
                                        </a>
                                    </Grid>

                                </Grid>

                                {/* <h5 className="mt-4 schedule-detail-header">Student list ({schedule && schedule.students?.length ? schedule.students.length : 0})</h5>
                                {schedule && schedule.students?.length > 0 ?
                                    (
                                        <div className="table-responsive mt-3 pt-0">
                                            <table className="table table-borderless mt-0 schedule-detail-table">
                                                <thead>
                                                    <tr>
                                                        <th>Order</th>
                                                        <th>Image</th>
                                                        <th>Full name</th>
                                                        <th>Age</th>
                                                        <th>Gender</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {schedule?.students.map((student, index) =>
                                                        <tr key={index} className="item">
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <img
                                                                    className="img-responsive"
                                                                    style={{ height: "40px", width: "40px", borderRadius: "50%", border: "1px solid #f7f8fb" }}
                                                                    src={student?.image ?? defaultAvatar}
                                                                    alt="Student avatar"
                                                                />
                                                            </td>
                                                            <td>{student?.studentName}</td>
                                                            <td>{calculateAgeV1(student?.dateOfBirth) ?? ""}</td>
                                                            <td>{student?.gender != null ? convertGenderEnumToString(student.gender) : ""}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>) :
                                    (<p className="text-center">There is no student in the class</p>)
                                } */}
                            </>
                        )}

                    </>
                    )}
            </div>
        </div>
    );
};

export default StudentScheduleDetail;
