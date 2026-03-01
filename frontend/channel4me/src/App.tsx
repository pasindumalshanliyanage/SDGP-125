import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DoctorRegistrationProvider } from './context/doctorRegistrationContext';
import DoctorRegisterStep1 from './pages/doctor/register/DoctorRegisterStep1';
import DoctorRegisterStep2 from './pages/doctor/register/DoctorRegisterStep2';
import DoctorRegisterStep3 from './pages/doctor/register/DoctorRegisterStep3';
import DoctorLogin from './pages/RegistrationType';
import HomePage from './pages/homepage';
import RegistrationType from './pages/RegistrationType'; 
import DoctorInformation from './pages/doctor/dashboard/DoctorInformation';
import Appointment from './pages/doctor/dashboard/Appointment';
import PatientList from './pages/doctor/dashboard/PatientList';

function App() {
    return (
        <BrowserRouter>
            <DoctorRegistrationProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />

                     {/*  Registration Type Page */}
                    <Route path="/register" element={<RegistrationType />} />
                    
                    {/* Doctor Registration Flow */}
                    <Route path="/doctor/register/step1" element={<DoctorRegisterStep1 />} />
                    <Route path="/doctor/register/step2" element={<DoctorRegisterStep2 />} />
                    <Route path="/doctor/register/step3" element={<DoctorRegisterStep3 />} />

                    {/* Doctor Dashboard Flow */}
                    <Route path="/doctor/dashboard" element={<DoctorInformation />} />
                    <Route path="/doctor/dashboard/appointments" element={<Appointment />} />
                    <Route path="/doctor/dashboard/patients" element={<PatientList />} />
                    
                    {/* Doctor Login */}
                    <Route path="/doctor/login" element={<DoctorLogin />} />
                    
                    {/* Redirect to home for unknown routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </DoctorRegistrationProvider>
        </BrowserRouter>
    );
}

export default App;