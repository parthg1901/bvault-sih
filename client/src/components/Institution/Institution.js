import { useState } from "react";
import styles from "./Institution.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const Institution = (props) => {
  const [proof, setProof] = useState(false);
  const showProof = () => {
    const pr = proof;
    setProof(!pr);
  };
  const updateVerification = async (type) => {
    console.log("here");
    const res = await fetch(
      process.env.REACT_APP_SERVER + "/api/institutions/update",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ i_id: props._id, verified: type }),
      }
    );
    const obj = await res.json();
    console.log(props._id);
    props.updateVerification(props._id, obj.verified);
  };
  return (
    <div className={styles.container}>
      <div>Institution Name - {props.name}</div>
      <div>Email - {props.email}</div>
      <button className={styles.button} onClick={showProof}>
        {proof ? "Close" : "Show Proof"}
      </button>
      {proof ? (
        <div
          className={styles.modal}
          onClick={(e) => {
            if (e.target.id !== "proof") {
              showProof();
            }
          }}
        >
          <img
            src={
              process.env.REACT_APP_SERVER + "/api/images/" + props.proofImage
            }
            alt="proof"
            id="proof"
          />
        </div>
      ) : (
        ""
      )}
      <div>
        {props.verified === "no" ? (
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => updateVerification("yes")}
            >
              Approve{" "}
              <FontAwesomeIcon icon={faCircleCheck} color="rgb(0, 202, 0)" />
            </button>
            <button
              className={styles.button}
              onClick={() => updateVerification("rejected")}
            >
              Reject{" "}
              <FontAwesomeIcon icon={faCircleXmark} color="rgb(255, 51, 51)" />
            </button>
          </div>
        ) : props.verified === "yes" ? (
          <div>Status - Verified</div>
        ) : (
          <div>Status - Rejected</div>
        )}
      </div>
    </div>
  );
};

export default Institution;
