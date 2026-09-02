const BackgroundImageWithHeading = (props) => {
  return (
    <div>
      <section className={props.sectionBgImages}>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-12">
              <h1 className={props.secBgHeadingClass} style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                {props.sectionBgHeading}
              </h1>
              <p className={props.secBgDesClass}>
                {props.sectionBgDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackgroundImageWithHeading;
