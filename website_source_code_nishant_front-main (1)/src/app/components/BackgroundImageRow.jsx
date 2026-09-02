const BackgroundImageRow = (props) => {
  return (
    <div>
      <section className={props.sectionBgImages}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-6">
                  {/* Added text-white class and inline style to override any global dark heading rules */}
                  <h1 
                    className={`${props.secBgHeadingClass || ''} text-white`} 
                    style={{ color: '#ffffff' }}
                  >
                    {props.sectionBgHeading}
                  </h1>
                </div>
                <div className="col-lg-6">
                  {/* Added a text-light class to ensure the description is also readable on dark backgrounds */}
                  <p 
                    className={`${props.secBgDesClass || ''} text-light`}
                    style={{ opacity: 0.9 }}
                  >
                    {props.sectionBgDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackgroundImageRow;