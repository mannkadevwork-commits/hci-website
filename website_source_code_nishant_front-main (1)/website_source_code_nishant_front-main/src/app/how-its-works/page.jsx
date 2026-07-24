import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";

export const metadata = {
  title: "How High Creation Interior Work",
  description: "How High Creation Interior Works For Residential Projects. Want to know more about work contact us today.",
};

const stepsData = [
  {
    id: "one",
    stepNumber: "01",
    title: "Consultation & Requirement Gathering",
    img: "/images/how-it-work/1.png",
    points: [
      "Your comfort is our priority. We offer online consultations, offline discussions, or in-person meetings.",
      "Choose the mode that suits your comfort and schedule.",
      "Our team ensures a smooth and personalized experience at every step.",
      "We understand your needs and bring your vision to life.",
      "Get the first design cut of your dream interior to visualize your space better."
    ],
    align: "left"
  },
  {
    id: "two",
    stepNumber: "02",
    title: "Site Visit & Measurement",
    img: "/images/how-it-work/2.png",
    points: [
      "Our team conducts a site visit to understand the space and layout.",
      "Accurate measurements are taken to ensure a perfect fit for your design.",
      "This step helps us plan every detail with precision and efficiency.",
      "It also allows us to identify any on-site challenges in advance.",
      "A well-measured space is the foundation of flawless interior execution."
    ],
    align: "right"
  },
  {
    id: "three",
    stepNumber: "03",
    title: "Design Presentation & Finalization",
    img: "/images/how-it-work/3.png",
    points: [
      "We begin by presenting carefully curated design concepts tailored to your preferences.",
      "Detailed layouts, 3D visuals, and material selections are shared for better clarity.",
      "Your feedback is taken into consideration to refine and finalize the design.",
      "Every element is discussed thoroughly to ensure it aligns with your vision.",
      "Final approval is taken before moving ahead with execution."
    ],
    align: "left"
  },
  {
    id: "four",
    stepNumber: "04",
    title: "Quotation & Agreement",
    img: "/images/how-it-work/10.png",
    points: [
      "A detailed quotation will be provided outlining all costs and services.",
      "It ensures complete transparency in pricing with no hidden charges.",
      "Once the quotation is approved, an agreement will be shared for mutual clarity.",
      "The agreement will cover scope of work, timelines, payment terms, and warranties.",
      "This helps ensure smooth execution and builds trust throughout the project."
    ],
    align: "right"
  },
  {
    id: "five",
    stepNumber: "05",
    title: "Execution & Handover",
    img: "/images/how-it-work/5.png",
    points: [
      "Our expert team ensures smooth and timely project execution as per the approved design.",
      "Quality checks are conducted at every stage to maintain high standards.",
      "Regular updates are shared to keep you informed throughout the process.",
      "Final inspection is done to ensure everything is perfect before handover.",
      "Your dream space is handed over, ready for you to move in and enjoy."
    ],
    align: "left"
  }
];

const HowItsWork = () => {
  return (
    <div>
      <head>
        <title >We make home interiors a breeze!</title>
        <meta name="description" content="We make home interiors a breeze!" />
        <link rel="canonical" href="https://hcinterior.in/how-its-works" />
      </head>

      <MainLayout>
        <style dangerouslySetInnerHTML={{ __html: `
          .how-it-works-section {
            overflow: hidden;
            background-color: #ffffff;
          }
          
          .step-row-wrapper {
            padding: 4rem 0;
            transition: all 0.3s ease;
          }

          /* 🌟 LIGHT THEME (For Steps 1, 3, 5) */
          .step-row-light {
            background-color: #ffffff;
          }
          .step-row-light .step-title {
            color: #222222;
          }
          .step-row-light .step-list li {
            color: #555555;
          }

          /* 🌟 DARK THEME (For Steps 2, 4) */
          .step-row-dark {
            background-color: #1a1a1a; 
          }
          /* This strictly guarantees the heading is white in the dark sections */
          .step-row-dark .step-title {
            color: #ffffff !important;
          }
          .step-row-dark .step-list li {
            color: #e0e0e0; 
          }

          .step-badge {
            display: inline-block;
            background-color: rgba(255, 145, 77, 0.1);
            color: #ff914d;
            font-family: var(--font-outfit), sans-serif;
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 8px 20px;
            border-radius: 50px;
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 145, 77, 0.3);
          }

          .step-title {
            font-family: var(--font-outfit), sans-serif;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            line-height: 1.2;
          }

          .step-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .step-list li {
            position: relative;
            padding-left: 35px;
            margin-bottom: 1rem;
            font-family: var(--font-poppins), sans-serif;
            font-size: 1.05rem;
            line-height: 1.6;
          }

          /* Custom Brand-Colored Checkmarks */
          .step-list li::before {
            content: '✔';
            position: absolute;
            left: 0;
            top: 2px;
            color: #ff914d;
            font-size: 1.1rem;
            background: rgba(255, 145, 77, 0.15);
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          /* Sizing constraints for the icons/images */
          .step-img-container {
            text-align: center;
            padding: 1rem;
          }

          .step-img {
            width: 100%;
            max-width: 450px; 
            height: auto;
            object-fit: contain;
            transition: transform 0.4s ease;
          }

          .step-img:hover {
            transform: translateY(-10px);
          }

          .force-white-heading {
            color: #ffffff !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.4);
          }

          /* Mobile Adjustments */
          @media (max-width: 767px) {
            .step-row-wrapper { padding: 3rem 0; }
            .step-title { font-size: 1.6rem; }
            .step-list li { font-size: 0.95rem; margin-bottom: 0.8rem; }
            
            .step-img { max-width: 280px; }
          }
        `}} />

        <main className="how-it-works-section">
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading="We make home interiors a breeze!"
            secBgHeadingClass="sec_bgheading_lass force-white-heading" 
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />

          {stepsData.map((step, index) => {
            const isImageLeft = step.align === "left";
            
            // 🌟 LOGIC: If it's an even index (0, 2, 4), use Light Theme. 
            // If it's an odd index (1, 3 - which are Steps 2 & 4), use Dark Theme!
            const isDarkTheme = index % 2 !== 0; 
            
            return (
              <div className={`step-row-wrapper ${isDarkTheme ? 'step-row-dark' : 'step-row-light'}`} id={step.id} key={step.id}>
                <div className="container">
                  <div className="row align-items-center">
                    
                    {/* IMAGE COLUMN */}
                    <div className={`col-12 col-md-5 ${isImageLeft ? 'order-1 order-md-1' : 'order-1 order-md-2'}`}>
                      <div className="step-img-container">
                        <img 
                          src={step.img} 
                          alt={step.title} 
                          className="step-img"
                          loading="lazy" 
                        />
                      </div>
                    </div>

                    {/* SPACING COLUMN FOR DESKTOP */}
                    <div className="d-none d-md-block col-md-1 order-md-1"></div>

                    {/* TEXT COLUMN */}
                    <div className={`col-12 col-md-6 mt-4 mt-md-0 ${isImageLeft ? 'order-2 order-md-2' : 'order-2 order-md-1'}`}>
                      <div className="step-content px-2 px-md-0">
                        <span className="step-badge">Step {step.stepNumber}</span>
                        
                        {/* Simply use step-title. The CSS block above will force it to be white if it is inside .step-row-dark */}
                        <h2 className="step-title">
                          {step.title}
                        </h2>
                        
                        <ul className="step-list">
                          {step.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </MainLayout>
    </div>
  );
};

export default HowItsWork;