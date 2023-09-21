import React, { useState } from 'react';
import './ParkingManagement.css';
import image from './images.webp'

function ParkingManagement() {
    const [vehicleType, setVehicleType] = useState('2-wheeler');
    const [numberPlate, setNumberPlate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [formVisible, setFormVisible] = useState(false);

    const handleNumberPlateChange = (e) => {
        setNumberPlate(e.target.value);
    };

    const [parkingFee, setParkingFee] = useState(0); // Initialize parking fee to 0

    const calculateParkingFee = (vehicleType, start, end) => {
        const startDateTime = new Date(start);
        const endDateTime = new Date(end);
        const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60); // Convert milliseconds to hours

        // Define fee structures for different vehicle types
        const feeStructure = {
            '2-wheeler': [
                { maxHours: 3, fee: 5 },
                { maxHours: 6, fee: 10 },
                { maxHours: 12, fee: 12 },
                { maxHours: 24, fee: 20 },
            ],
            '3-wheeler': [
                { maxHours: 3, fee: 7 },
                { maxHours: 6, fee: 12 },
                { maxHours: 12, fee: 15 },
                { maxHours: 24, fee: 25 },
            ],
            '4-wheeler': [
                { maxHours: 3, fee: 10 },
                { maxHours: 6, fee: 15 },
                { maxHours: 12, fee: 20 },
                { maxHours: 24, fee: 30 },
            ],
        };
        // Find the appropriate fee structure for the vehicle type
        const selectedFeeStructure = feeStructure[vehicleType] || [];

        // Find the fee based on the duration
        let fee = 0;
        for (const tier of selectedFeeStructure) {
            if (durationInHours <= tier.maxHours) {
                fee = tier.fee;
                break;
            }
        }

        // For more than 24 hours, charge 20 per day
        if (durationInHours > 24) {
            const days = Math.floor(durationInHours / 24);
            fee = fee + 20 * days;
        }

        return fee;
    };

    const handleVehicleTypeChange = (e) => {
        const newVehicleType = e.target.value;
        setVehicleType(newVehicleType);
        // Recalculate parking fee when vehicle type is changed
        const fee = calculateParkingFee(newVehicleType, startTime, endTime);
        console.log('Updated Fee:', fee);
        setParkingFee(fee);
    };
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        // Recalculate parking fee when start time is changed
        const fee = calculateParkingFee(vehicleType, e.target.value, endTime);
        setParkingFee(fee);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        // Recalculate parking fee when end time is changed
        const fee = calculateParkingFee(vehicleType, startTime, e.target.value);
        setParkingFee(fee);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform actions with the captured data, such as storing it or generating a bill
        console.log('Vehicle Type:', vehicleType);
        console.log('Number Plate:', numberPlate);
        console.log('Start Time:', startTime);
        console.log('End Time:', endTime);

        // Reset the form fields after submission
        setVehicleType('2-wheeler');
        setNumberPlate('');
        setStartTime('');
        setEndTime('');
        setParkingFee(0);
    };


    return (
        <div className='parking-container'>
            <img src={image} className='image-container' />

            <form onSubmit={handleSubmit} className="parking-form">
                <h1>Parking Management System</h1>
                <div className="form-group">
                    <label>Vehicle Type:</label>
                    <select value={vehicleType} onChange={handleVehicleTypeChange} className="form-control">
                        <option value="2-wheeler">2-wheeler</option>
                        <option value="3-wheeler">3-wheeler</option>
                        <option value="4-wheeler">4-wheeler</option>
                        {/* Add more vehicle types as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Number Plate:</label>
                    <input
                        type="text"
                        value={numberPlate}
                        onChange={handleNumberPlateChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="form-group">
                    <label>Parking Fee:</label>
                    <span>{parkingFee} Rs</span>
                </div>
            </form>

        </div>
    );
}

export default ParkingManagement;
