import React from "react";
import PersonImg from '../../assets/images/person.png'
import AboutCSS from '../../assets/css/about.module.css'

const About = () => {
    return (
        <div>
            <div className={AboutCSS.container}>
                <h2 className={AboutCSS.leftElement}>About</h2>
            </div>
            <div className={AboutCSS.AboutUs}>
                <p id="aboutUs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra justo nec dolor dignissim, id dictum libero tincidunt. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed viverra justo nec dolor dignissim, id dictum libero tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra justo nec dolor
                    dignissim, id dictum libero tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra justo nec dolor dignissim, id dictum libero tincidunt. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra justo nec dolor dignissim, id dictum libero tincidunt.
                </p>
            </div>
            <div className={AboutCSS.teamContainer}>
                <div className={AboutCSS.teamMember}>
                    <img src={PersonImg} alt="Team Member 1" />
                    <h3>Jane Smith</h3>
                    <p className={AboutCSS.memberDescription}>Pellentesque convallis enim ac lorem congue, sit amet convallis lorem fringilla. Nulla vitae scelerisque odio.</p>
                </div>

                <div className={AboutCSS.teamMember}>
                    <img src={PersonImg} alt="Team Member 2" />
                    <h3>Jane Smith</h3>
                    <p className={AboutCSS.memberDescription}>Pellentesque convallis enim ac lorem congue, sit amet convallis lorem fringilla. Nulla vitae scelerisque odio.</p>
                </div>

                <div className={AboutCSS.teamMember}>
                    <img src={PersonImg} alt="Team Member 3" />
                    <h3>Jane Smith</h3>
                    <p className={AboutCSS.memberDescription}>Pellentesque convallis enim ac lorem congue, sit amet convallis lorem fringilla. Nulla vitae scelerisque odio.</p>
                </div>

                <div className={AboutCSS.teamMember}>
                    <img src={PersonImg} alt="Team Member 4" />
                    <h3>Jane Smith</h3>
                    <p className={AboutCSS.memberDescription}>Pellentesque convallis enim ac lorem congue, sit amet convallis lorem fringilla. Nulla vitae scelerisque odio.</p>
                </div>

                <div className={AboutCSS.teamMember}>
                    <img src={PersonImg} alt="Team Member 5" />
                    <h3>Jane Smith</h3>
                    <p className={AboutCSS.memberDescription}>Pellentesque convallis enim ac lorem congue, sit amet convallis lorem fringilla. Nulla vitae scelerisque odio.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
