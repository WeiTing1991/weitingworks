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
        visible: { opacity: 1, y: 150 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <h2 className="contact-title"></h2>
      <h2 className="contact-sub-title">Get In Touch</h2>
      <p className="contact-text">
      </p>
      <div className="contact-cta">
        <Button link="mailto:weitingchen0502@gmail.com" text="Contact Me"></Button>
      </div>
    </motion.div>
  );
}

export default Contact;
