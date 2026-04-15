import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import constant from "../../public/constant.json";

function About() {
  return (
    <motion.div
      className="about"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 60 },
      }}
    >
      <div className="title">
        <h2>ABOUT ME</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          <p className="about-grid-info-text">
            Hi, I am a <strong>software engineer </strong> based in Zurich, specializing in the fields of software
            development, CAD/CAM, robotics, and automation.
          </p>
          <p className="about-grid-info-text">
            In the past few year, I have worked as a project consultant, software engineer, and researcher in both
            industrial and academic areas, especially in the domain of research development, CAD/CAM, robotic, digital
            fabrication, and manufacturing.
          </p>
          <p className="about-grid-info-text">
            I bring variety and an interdisciplinary perspective to my work and interests with a{" "}
            <Link href="https://masdfab.arch.ethz.ch/" className="link" target="_blank">
              MAS
            </Link>{" "}
            in Robotics & Digital Fabrication from ETH Zürich, a{" "}
            <Link
              href="https://www.bath.ac.uk/departments/department-of-computer-science/"
              className="link"
              target="_blank"
            >
              MSc in Computer Science{" "}
            </Link>{" "}
            at University of Bath, and a{" "}
            <Link href="https://www.facebook.com/digitalaieou" className="link" target="_blank">
              Bachelor of Architecture{" "}
            </Link>{" "}
            from Tamkang University under the group of Architecture & Digital Fabrication Digital & Robotic Fabrication
            LAB.
          </p>
          <p className="about-grid-info-text">
            Currently, I work as Software Engineer at {" "}
            <Link href="https://www.manukai.ch/" className="link" target="_blank">
              Manukai AG{" "}
            </Link>{" "}
            for AI applications with CAD/CAM software.
            <br />
            <br />
            Besides work, I love exploring new technologies and tools, lifting, and reading.
          </p>
        </div>
        {/* <div className="about-grid-info">
          <p className="about-grid-info-text">Tech Stack:</p>
          <p className="about-grid-info-subtext">Language:</p>
          <ul className="about-grid-info-list">
            {constant.skills.language.map((item, idx) => {
              return (
                <li key={idx} className="about-grid-info-list-item">
                  {item}
                  {""}
                </li>
              );
            })}
          </ul>
          <p className="about-grid-info-subtext">Backend:</p>
          <ul className="about-grid-info-list">
            {constant.skills.backEnd.map((item, idx) => {
              return (
                <li key={idx} className="about-grid-info-list-item">
                  {item}
                  {""}
                </li>
              );
            })}
          </ul>
          <p className="about-grid-info-subtext">Frontend:</p>
          <ul className="about-grid-info-list">
            {constant.skills.frontEnd.map((item, idx) => {
              return (
                <li key={idx} className="about-grid-info-list-item">
                  {item}
                  {""}
                </li>
              );
            })}
          </ul>
          <p className="about-grid-info-subtext">Industrial:</p>
          <ul className="about-grid-info-list">
            {constant.skills.industrial.map((item, idx) => {
              return (
                <li key={idx} className="about-grid-info-list-item">
                  {item}
                  {""}
                </li>
              );
            })}
          </ul>
          <p className="about-grid-info-subtext">
            The technologies I am currently exploring:
          </p>
          <ul className="about-grid-info-list">
            {constant.skills.new.map((item, idx) => {
              return (
                <li key={idx} className="about-grid-info-list-item">
                  {item}{" "}
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </motion.div>
  );
}

export default About;
