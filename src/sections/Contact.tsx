import Button from "@/components/Button";
import { motion } from "framer-motion";
import hand from '../../public/animation/hand.json';

function Contact() {

  const options = {
    animationData: hand,
    loop: true,
  };

  return (
    <motion.div
      className="contact"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 60 },
      }}
    >
      <p className="contact-overline">What&apos;s Next?</p>
      <h2 className="contact-sub-title">Get In Touch</h2>
      <p className="contact-text">
        I&apos;m currently open to new opportunities and collaborations.
        Whether you have a question, a project in mind, or just want to say hi,
        my inbox is always open.
      </p>
      <div className="contact-cta">
        <Button link="mailto:weitingchen0502@gmail.com" text="Say Hello"></Button>
      </div>
    </motion.div>
  );
}

export default Contact;
