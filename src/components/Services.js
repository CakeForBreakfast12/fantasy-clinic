import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope, faSyringe, faClinicMedical, faUserMd } from '@fortawesome/free-solid-svg-icons'

const Services = () => (
    <div>
        <div className="image-container content-image">
            <img src="/images/specialties.jpg" width="100%" ></img>
        </div>
        <div className="content-container">
            <div className="article">
                <h1>Services</h1>
                <div className="col2-container">
                    <div className="col2-column">
                        <h1><FontAwesomeIcon icon={faStethoscope} /></h1>
                        <h2>Non-invasive investigations</h2>
                        <h2><hr /></h2>
                        <p>Resting 12-lead EKG</p>
                        <p>Exercise EKG (stress test)</p>
                        <p>Echocardiogram (Heart Ultrasound)</p>
                        <p>Transesophageal Ultrasonography</p>
                        <p>24h Holter monitor</p>
                        <p>Cardiac Event Recorder</p>
                        <p>Ankle-brachial pressure index (ABPI)</p>
                        <p>Carotid Artery Duplex Scan</p>
                        <p>Monitoring and follow-up of pacemakers and implantable cardioverter defibrillators</p>
                        <p>Polysomnography (sleep study)</p>
                    </div>
                    <div className="col2-column">
                        <h1><FontAwesomeIcon icon={faSyringe} /></h1>
                        <h2>Invasive investigations</h2>
                        <h2><hr /></h2>
                        <p>Coronary angiogram</p>
                        <p>Peripheral angiogram</p>
                        <p>Venography</p>
                        <p>Right Heart Catheterization</p>
                        <p>Electrophysiology Studies</p>
                    </div>
                </div>
                <div className="col2-container">
                    <div className="col2-column">
                        <h1><FontAwesomeIcon icon={faClinicMedical} /></h1>
                        <h2>Interventional procedures</h2>
                        <h2><hr /></h2>
                        <p>Percutaneous transluminal angioplasty</p>
                        <p>Metallic stent implant angioplasty</p>
                        <p>Drug-eluting balloon angioplasty</p>
                        <p>Pacemaker and Defibrillator Implantation and Programming</p>
                        <p>Cardiac Resynchronization Therapy</p>
                        <p>Radiofrequency ablation</p>
                        <p>Vena cava filter implantation</p>
                        <p>Percutaneous Closure of Ventricular Septal Defect</p>
                        <p>Uterine fibroid embolization</p>
                        <p>Pain management therapy</p>
                    </div>
                    <div className="col2-column">
                        <h1><FontAwesomeIcon icon={faUserMd} /></h1>
                        <h2>Surgical procedures</h2>
                        <h2><hr /></h2>
                        <p>Femoral Popliteal Bypass</p>
                        <p>Profundoplasty</p>
                        <p>Carotid endarterectomy</p>
                        <p>Heart Surgery</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Services;