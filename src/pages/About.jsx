import React from "react";
import rawezh from "../img/rawezh.jpeg";
import styles from "../styles/about.css";
import Donation from "../components/Donation";

const About = () => {
  return (
    <div>
      <h1 className="rawezh_head">I'm Rawezh</h1>
      <div className="rawezh_box">
        <div className="rawezh_img">
          <img src={rawezh} alt="rawezh" />
        </div>
        <p>
          {" "}
          My name is rawezh. I am 25 years old and live in Hamburg. I am
          currently training to be a software engineer and work as a software
          engineer, web developer and graphic designer. Before that I studied
          graphic design and a little bit journalism. I already have experience
          with many programming languages like Java, Python, ABAP, Kotlin,
          Swift, C#, C, Java Script. I also spend my time as ui/ux designer and
          love to write and make music. I love meeting new people, nature,
          animals and of course my job.
        </p>
      </div>
      <h3 className="sendEmail">
        <a href="mailto:rawezhhame@gmail.com">Send me an Email</a>
      </h3>
      <Donation />
    </div>
  );
};

export default About;
