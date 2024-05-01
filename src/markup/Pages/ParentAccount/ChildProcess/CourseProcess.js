import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../Layout/Header'
import PageTitle from '../../../Layout/PageTitle'
import background from '../../../../images/background/accountBackground.jpg';
import instance from '../../../../helper/apis/baseApi/baseApi';

export default function CourseProcess() {
  const { studentId, courseId } = useParams();
  const [progressData, setProgressData] = useState(null);
  const colors = ['#F69E4A', '#EF7E54', '#F25B58', '#E53E5C'];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await instance.get(`api/v1/students/progress/course/lessons?studentId=${studentId}&courseId=${courseId}`);
        setProgressData(response.data);
        console.log('response.data: ', response.data);
      } catch (error) {
        navigate('/not-found')
        console.error('Error fetching course progress:', error);
      }
    };

    fetchProgressData();
  }, [studentId, courseId]);

  const VerticalLine = ({ color }) => {
    const style = {
      borderLeft: `2px solid ${color}`,
      height: '100px', // Adjust this to match your design
      margin: '0 auto',
    };

    return <div style={style}></div>;
  };


  return (
    <div>
      <Header />
      <PageTitle motherMenu="Course process" activeMenu="Course process" />
      <div style={{
        backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container">
          <div className="d-flex justify-content-center mt-4 p-4" style={{ backgroundColor: 'white' }}>
            {progressData ? (
              progressData.sectionProgress.map((section, index) => {
                const color = colors[index % colors.length]; // Repeat colors for 5th, 6th, ... items
                return (
                  <div key={section.sectionId} className="section-progress" style={{ width: '20%', marginLeft: '2.5%', marginRight: '2.5%' }}>
                    <div className="lesson-circle d-flex align-items-center text-center justify-content-center" style={{ backgroundColor: color, borderRadius: '50%', height: '220px' }}>
                      <div>
                        <p style={{ color: 'white' }}><i style={{ fontSize: '26px' }} className="fa-solid fa-book"></i></p>
                        <p>
                          <span style={{ color: 'white', fontSize: '24px' }}>SECTION {index + 1}</span>
                        </p>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <VerticalLine color={color} /> {/* Pass color to VerticalLine */}
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>
                        <i className="fa-solid fa-circle" style={{ color: color }}></i> {/* Set icon color */}
                      </p>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <span style={{ color: color, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '5px 10px', borderRadius: '5px' }}>{section.progress}%</span> {/* Set text color */}
                    </div>
                    <div className='mt-3'>

                      <p className="text-center">{section.sectionName}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading progress...</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
