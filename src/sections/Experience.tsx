import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import constant from '../../public/constant.json';
import Button from '@/components/Button';

function Experience() {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      className="experience"
      id="experience"
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
        <h2>EXPERIENCE</h2>
      </div>
      <div className="container">
        <ul className="exp-slider">
          <div
            className="underline"
            style={{ transform: `translateY(${selected * 3}rem)` }}
          ></div>
          {constant.experiences.map((experience, index) => {
            return (
              <li
                className={`exp-slider-item ${index === selected && 'exp-slider-item-selected'}`}
                onClick={() => setSelected(index)}
                key={index}
              >
                <span>{experience.company}</span>
              </li>
            );
          })}
        </ul>
        <div className="exp-details">
          <div className="exp-details-position">
            {constant.experiences[selected].position.map((position, index) => {
              return (
                <>
                  <h3>
                    <span>{position.title}</span>
                    <span className="exp-details-position-company">
                      &nbsp;@&nbsp;
                      <Link href={position.link} className="link" target="_blank">
                        {position?.group}
                        &nbsp;
                        {constant.experiences[selected].company}
                      </Link>
                    </span>
                  </h3>
                  <p className="exp-details-range">{position.duration}</p>
                  <div className="exp-details-skills">
                    {position.skill[0].split("|").map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                  <ul className="exp-details-list">
                    {position.desc.map((desc, index) => {
                      return (
                        <li key={index} className="exp-details-list-item">
                          {desc}
                        </li>
                      );
                    })}
                  </ul>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="contact-cta">
        <Button link="./" text="Resume"></Button>
      </div>
    </motion.div>
  );
}

export default Experience;
