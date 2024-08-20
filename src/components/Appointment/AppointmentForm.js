import React, { useState, useEffect } from 'react';
import './AppointmentForm.css';
import Modal from '../Modal/Modal'; // Import Modal component correctly

function AppointmentForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        mobile: '',
        doctor: '',
        disease: '',
        date: '',
        time: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = "https://mediafiles.botpress.cloud/37dc6043-18cd-49ec-9088-37150adec087/webchat/v2/config.js";
        script2.async = true;
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/add-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setModalMessage("Appointment booked successfully!");
                setIsModalOpen(true);
            } else {
                setModalMessage("Error booking appointment: " + data.error);
                setIsModalOpen(true);
            }
        })
        .catch(error => {
            setModalMessage("Error: " + error);
            setIsModalOpen(true);
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="appointment-form">
            <div className="form-container">
                <h2>Book An Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Your Name*</label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age*</label>
                            <input type="text" id="age" name="age" required value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile No.*</label>
                            <input type="text" id="mobile" name="mobile" required value={formData.mobile} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Select Date*</label>
                            <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time*</label>
                            <input type="time" id="time" name="time" required value={formData.time} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="disease">Mention Your Disease</label>
                        <textarea id="disease" name="disease" value={formData.disease} onChange={handleChange}></textarea>
                    </div>
                    <div className="button-group">
                        <button type="submit">Appointment</button>
                        <button type="button">Doctors</button>
                    </div>
                </form>
            </div>
            <div className="image-container">
                <img src="/img/front.jpg" alt="Medical Illustration" />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
        </div>
    );
}

export default AppointmentForm;
