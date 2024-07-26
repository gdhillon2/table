import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  icon: string;
  description: string;
}

const Button: React.FC<ButtonProps> = ({ icon, description }) => {
  return (
    <div className={styles["cool-card"]}>
      <button className={styles["button-text"]}>
        {icon}
        <div className={styles.hov}>{description}</div>
      </button>
    </div>
  );
};

export default Button;
