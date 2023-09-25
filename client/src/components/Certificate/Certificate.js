import styles from "./Certificate.module.css";

const Certificate = (props) => {
  const image = (img) => {
    if (img !== "") {
      if (img.name) return URL.createObjectURL(img, { autoRevoke: true });
      else return process.env.REACT_APP_SERVER + "/api/images/" + img;
    }
  };
  return (
    <div
      className={styles.modal}
      style={{
        marginTop: `${props.preview === false ? "-10000000000px" : ""}`,
      }}
      onClick={(e) => {
        if (e.target.id !== "certificate") {
          props.setPreview(false)
        }
      }}
    >
      <div
        className={styles.container + " " + `${props.preview && styles.scale}`}
        id="certificate"
        style={{
          backgroundImage: `url("${image(props.templateURL)}")`,
        }}
      >
        <div className={styles.header}>
          <div
            className={styles.logo}
            style={{ backgroundImage: `url("${image(props.logo)}")` }}
          ></div>
          <p className={styles.title}>{props.title}</p>
        </div>
        <div className={styles.main}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.description}>{props.description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.left}>
            <img className={styles.qr} style={{ display: "hidden" }} alt="" />
          </div>
          <div className={styles.right}>
            <img
              className={styles.signature}
              src={image(props.signatureURL)}
              alt=""
            />
            <div className={styles.signerDetails}>
              <div className={styles.signatory}>{props.signerDetails.name}</div>
              <div className={styles.designation}>
                {props.signerDetails.designation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
