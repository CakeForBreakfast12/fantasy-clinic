import React from 'react';



const Doctors = () => (
    <div className="content-container">
        <div className="article">
            <h1>Doctor Stories | Fantasy Clinic</h1>
            <p>Get behind the white coats and discover what makes UCSF doctors tick: what inspires them, what they're passionate about, and the personal and professional experiences that make them the doctors they are today.</p>
        </div>
        <div className="cards-container">
            <div className="card">
                <div className="card-photo" >
                    <img src="/images/franklin.jpg" width="376" height="188" />
                </div>
                <div className="card-article">
                    <h2>Stephen Franklin</h2>
                    <p>Stephen Franklin was Babylon 5's Chief Medical Officer from 2258 - 2262, having replaced Benjamin Kyle in the post. Franklin then went on to be Head of Xenobiological Research at Earth Dome</p>
                </div>
            </div>
            <div className="card">
                <div className="card-photo">
                    <img src="/images/mccoy.jpg" width="376" height="188" />
                </div>
                <div className="card-article">
                    <h2>Leonard McCoy</h2>
                    <p>In 2253, McCoy developed a surgical procedure for the humanoid brain; grafting neural tissue to the cerebral cortex, followed by the creation of an axonal pathway between the tissue graft and the basal ganglia.</p>
                </div>
            </div>
            <div className="card">
                <div className="card-photo" id="stephen-strange">
                    <img src="/images/strange.jpg" width="376" height="188" />
                </div>
                <div className="card-article">
                    <h2>Stephen Vincent Strange</h2>
                    <p>Strange went to medical school and eventually graduated with an M.D. and Ph.D. at the same time.As an adult, he had begun specializing in neurological surgery and focusing his research on the formation of new nerve cells.</p>
                </div>
            </div>
        </div>

    </div>
);



export default Doctors;