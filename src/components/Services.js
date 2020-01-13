import React from 'react';

const Services = () => (
    <div>
        <div className="image-container content-image">
            <img src="/images/specialties.jpg" width="100%" ></img>
        </div>
        <div className="content-container">
            <div className="article">
                <h1>Services</h1>
                <div className="col2-container">
                    <div className="col2-left">
                        <h2>Non-invasive investigations</h2>
                        <p>Resting 12-lead EKG</p>
                        <p>Exercise EKG (stress test)</p>
                        <p>Echocardiogram (Heart Ultrasound)</p>
                        <p>Transesophageal Ultrasonography</p>
                        <p>24h Holter monitor</p>
                        <p>Cardiac Event Recorder</p>
                        <p>Ankle-brachial pressure index (ABPI)</p>
                        <p>Carotid Artery Duplex Scan</p>
                    </div>
                    <div className="col2-right">
                        <h2>Invasive investigations</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Services;