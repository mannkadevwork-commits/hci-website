// src/app/home/HomeContent.jsx
import dynamic from "next/dynamic";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { 
  FaShieldAlt, FaClock, FaCheckCircle, FaHome, 
  FaMapMarkerAlt, FaGem, FaUser, FaTools, 
  FaStar, FaAward, FaTrophy
} from "react-icons/fa";

const ICON_MAP = {
  FaShieldAlt, FaClock, FaCheckCircle, FaHome, 
  FaMapMarkerAlt, FaGem, FaUser, FaTools, 
  FaStar, FaAward, FaTrophy
};
import React, { Fragment } from "react"; 

// --- CLIENT IMPORTS ---
import LazySection from "./clientHome/LazySection";
import ContactForm from "./clientHome/ContactForm";

// --- SERVER IMPORTS ---
import RowImage from "../components/RowImage";
import Card from "../components/Card";
import VideoCardHome from "../components/VideoCardHome";
import BgImageCard from "../components/BgImageCard";
import RoomOfice from "../components/RoomOfice";
import HomeAbout3D from "../components/HomeAbout3D";
import EstimateCalculator from "./clientHome/EstimateCalculator";
import { getBackendImageUrl } from "@/utils/leadForms";

// --- DYNAMIC IMPORTS ---
const Blogs = dynamic(() => import("../components/Blogs"));
const SliderCard = dynamic(() => import("../components/SliderCard"), { ssr: false, loading: () => <div style={{ height: "400px", background: "#f8f9fa", width: "100%" }} /> });
const VideoTestimonialSlider = dynamic(() => import("../components/VideoTestimonialSlider"), { ssr: false, loading: () => <div style={{ height: "400px", background: "#f8f9fa", width: "100%" }} /> });
const CounterRow = dynamic(() => import("../components/CounterRow"), { ssr: false, loading: () => <div style={{ height: "300px", background: "#f8f9fa", width: "100%" }} /> });

// --- DATA FETCHING WITH FETCH ---
async function getRemainingData() {
  const baseURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV_URL : process.env.NEXT_PUBLIC_API_BASE_URL;
  const fetchData = async (endpoint) => {
      try {
          const res = await fetch(`${baseURL}${endpoint}`, { next: { revalidate: 60 } });
          if (!res.ok) return [];
          const text = await res.text();
          return text ? JSON.parse(text) : [];
      } catch (e) { return []; }
  };

  try {
    const [designIdea, h3d_gallery, contentData, blogsData, whyChooseUsRaw,estimateBannerRaw , estimateCardsRaw] = await Promise.all([
      fetchData("/cms-parent-child/designer_choice"),
      fetchData("/cms-parent-child/h3d_gallery"),
      fetchData("/cms-content/home_page_content_what_we_are"),
      fetchData("/cms-blog"),
      fetchData("/cms-content/home_page_content_why_choose_us"),
      fetchData("/cms-content/home_page_estimate_banner"),
      fetchData("/cms-content/home_page_estimate_cards") 
    ]);
    
    let whyChooseUsData = [];
    if (whyChooseUsRaw) {
      const record = Array.isArray(whyChooseUsRaw) ? whyChooseUsRaw[0] : whyChooseUsRaw;
      whyChooseUsData = record?.json_content || [];
    }
    
    let estimateBannerData = null;
    if (estimateBannerRaw) {
        const record = Array.isArray(estimateBannerRaw) ? estimateBannerRaw[0] : estimateBannerRaw;
        estimateBannerData = record?.json_content;
    }

    let estimateCardsData = [];
    if (estimateCardsRaw) {
        const record = Array.isArray(estimateCardsRaw) ? estimateCardsRaw[0] : estimateCardsRaw;
        estimateCardsData = record?.json_content || [];
    }

    return { designIdea: designIdea || [], h3d_gallery: h3d_gallery || [], content: contentData || [], blogs: Array.isArray(blogsData) ? blogsData.slice(0, 3) : [], whyChooseUsData, estimateBannerData, estimateCardsData };
  } catch (err) { return { designIdea: [], h3d_gallery: [], content: [], blogs: [], whyChooseUsData: [], estimateBannerData: null }; }
}

const formatDate = (dateString) => {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
};

export default async function HomeContent() {
  const { designIdea, h3d_gallery, content, blogs, whyChooseUsData, estimateBannerData,estimateCardsData } = await getRemainingData();

  const safeEstimateCards = Array.isArray(estimateCardsData) ? estimateCardsData : [];
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);
  const staticRecords = sortedDesignIdea.slice(-5);

  const workProcessConfig = [
    { id: 1, contentIdx: 20, number: "01", col1Class: "col-lg-2 col-md-3 col-6 pe-0", boxClass: "box1", col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box2" },
    { id: 2, contentIdx: 19, number: "02", col1Class: "col-lg-2 col-md-3 col-6 ps-lg-3 pe-0", boxClass: "box_2", col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box2_data" },
    { id: 3, contentIdx: 18, number: "03", col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3", boxClass: "box_3", col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box3_data" },
    { id: 4, contentIdx: 17, number: "04", col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3", boxClass: "box4 box_3", col2Class: "col-lg-2 col-md-3 col-6 ps-0 mt-lg-3", dataBoxClass: "box4_data" },
    { id: 5, contentIdx: 16, number: "05", col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3", boxClass: "box5 box_3", col2Class: "col-lg-2 col-md-3 col-6 ps-0 mt-lg-3", dataBoxClass: "box5_data" },
  ];

  const activeWhyChooseUsData = Array.isArray(whyChooseUsData) && whyChooseUsData.length > 0 ? whyChooseUsData : [
    { title: "Lifetime warranty¹", icon: "FaShieldAlt" }, { title: "45-day move-in guarantee²", icon: "FaClock" }, { title: "146 quality checks", icon: "FaCheckCircle" }
  ];

  const activeEstimateBanner = estimateBannerData || { is_active: true, heading: "Calculate the cost of your", rotating_words: "Kitchen, Wardrobe, Full Home, Living Room", description: "Get a personalized, transparent estimate for your interior project in just a few clicks. No hidden costs.", button_text: "Get Free Estimate" };
  const activeEstimateCards = safeEstimateCards.filter(card => card?.is_active !== false); 
  const finalMarqueeCards = activeEstimateCards.length > 0 ? activeEstimateCards : h3d_gallery.filter(item => !item.child_content?.title?.toLowerCase().includes("1 bhk")).slice(0, 5);

  const dynamicBgUrl = getBackendImageUrl(content?.bg_image || '/parent-child/wework_bgImage.jpg'); 
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .text-orange-force { color: #ff914d !important; }
        .banner-overlay { padding-bottom: 7rem !important; }
        
        /* 🌟 FIX 1: Restored Old Styling for "The Way We Work" Numbers */
        .box_heading { 
            color: #ffffff !important; 
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8) !important; 
            font-weight: 800 !important; 
            font-size: 5.5rem !important; 
            line-height: 1 !important;
            opacity: 0.9;
        }

        /* Fix visibility on images */
        .bgsectionroom .designercard *,
        .cardoffer h3, .cardoffer span,
        .card_room h3, .card_room h5, .card_room p, .card_room span {
            color: #ffffff !important;
            text-shadow: 0px 4px 12px rgba(0,0,0,0.9), 0px 1px 3px rgba(0,0,0,0.8) !important;
        }
        .bgsectionroom .designercard *, .card_room h3 { font-weight: 800 !important; }

        /* Revert cards to white */
        .savedesign .cardoffer * { color: #171717 !important; text-shadow: none !important; } 
        .savedesign .cardoffer .card-title { font-size: 1.25rem !important; font-weight: 700 !important; padding: 1rem 0.5rem !important; }
        .savedesign .cardoffer { display: flex; flex-direction: column; justify-content: space-between; height: 100%; }

        .estimate-fix-wrapper h2, .estimate-fix-wrapper h3, .estimate-fix-wrapper span { font-weight: 800 !important; }

        /* Robust Marquee Fix */
        .marquee-container-fix {
            display: flex;
            overflow: hidden;
            width: 100%;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content-fix {
            display: flex;
            animation: marqueeScroll 60s linear infinite;
            will-change: transform;
        }
        .marquee-container-fix:hover .marquee-content-fix {
            animation-play-state: paused;
        }
        @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .yt-fix-wrapper iframe, .yt-fix-wrapper [class*="youtube"] {
            width: 100% !important; height: auto !important;
            aspect-ratio: 16/9 !important; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .yt-fix-wrapper .card { border-radius: 12px; overflow: hidden; border: none; }
        
        @media (min-width: 768px) {
            .banner-overlay { padding-bottom: 9rem !important; }
        }

        @media (max-width: 768px) {
          /* 🌟 FIX 2: Reduce all large bootstrap spacings on mobile devices to collapse whitespace */
          .my-5 { margin-top: 1.5rem !important; margin-bottom: 1.5rem !important; }
          .py-5 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
          .mb-5 { margin-bottom: 1.5rem !important; }
          .mt-5 { margin-top: 1.5rem !important; }
          .pt-5 { padding-top: 1.5rem !important; }
          .pb-5 { padding-bottom: 1.5rem !important; }
          
          .mobile-scroll-row { display: flex !important; flex-wrap: nowrap !important; overflow-x: auto !important; scroll-snap-type: x mandatory; padding-top:20px !important; padding-bottom: 20px !important; margin-bottom: 10px !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; justify-content: flex-start !important; }
          .mobile-scroll-row::-webkit-scrollbar { display: none; }
          .mobile-scroll-row > [class*="col-"] { flex: 0 0 85% !important; max-width: 85% !important; scroll-snap-align: center; }
          .mobile-process-row { display: flex !important; flex-wrap: nowrap !important; overflow-x: auto !important; scroll-snap-type: x mandatory; padding-bottom: 20px !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; gap: 15px; margin-left: 0; margin-right: 0; justify-content: flex-start !important; }
          .mobile-process-row::-webkit-scrollbar { display: none; }
          .process-mobile-wrap { flex: 0 0 85% !important; scroll-snap-align: center; display: flex; flex-direction: column; }
          .process-mobile-wrap > div { width: 100% !important; max-width: 100% !important; flex: unset !important; padding-left: 0 !important; padding-right: 0 !important; }
        }
        @media (min-width: 769px) { .process-mobile-wrap { display: contents; } }
      `}} />

      <HomeAbout3D />

      <div className="my-5 oofer_card">
          <div className="container">
            <div className="mb-4 text-center">
               <span className="font_stylish text-orange-force d-block mb-1">Explore</span>
               <h2 className="h2 font_about mb-0 fw-bold">What we Offer</h2>
            </div>
            <div className="mx-0 row g-4 mobile-scroll-row">
              {[23, 24, 22, 21].map((index) => (
                <div className="col-lg-3 col-md-6 col-12" key={index}>
                  <Card cardNameALl="cardoffer" imgSrc={content[index]?.json_content?.image} imgAlt={"room"} imgClass={"offerimg"} titleCard={content[index]?.json_content?.title} descriptionCard={content[index]?.json_content?.description} buttonTextCard={"Know More"} linkCard={content[index]?.json_content?.designation} />
                </div>
              ))}
            </div>
            <div className="mt-5 text-end">
              <a href="/what-we-offer" className="pe-2 know_more fs-6">View More <MdKeyboardArrowRight className="fs-4" /> </a>
            </div>
          </div>
        </div>

      <div className="way_wework" style={{ backgroundImage: `url(${dynamicBgUrl})` }}>
          <div className="container">
            <div className="mb-5 text-center">
               <h2 className="h2 font_about fw-bold mb-0">The Way <span className="text-orange-force">We Work</span></h2>
            </div>
            <div className="mx-0 row justify-content-center g-lg-0 mobile-process-row">
              {workProcessConfig.map((step) => (
                <div className="process-mobile-wrap" key={step.id}>
                  <div className={step.col1Class}>
                    <div className={step.boxClass}><h3 className="box_heading">{step.number}</h3></div>
                  </div>
                  <div className={step.col2Class}>
                    <div className={step.dataBoxClass}>
                      <div className="px-3 px-lg-4 py-4">
                        {content[step.contentIdx]?.json_content?.image && (<Image src={content[step.contentIdx]?.json_content?.image} width={60} height={60} alt="icon" style={{ height: 'auto' }} />)}
                        <h4 className="py-2 text-white">{content[step.contentIdx]?.json_content?.title}</h4>
                        <p className="box_para">{content[step.contentIdx]?.json_content?.description}</p>
                        <div className="text-lg-center"><a className="know_mores" href={content[step.contentIdx]?.json_content?.designation}>Know More</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <LazySection placeholderHeight="300px">
        <section className="my-5 py-5" style={{ backgroundColor: "#fafafa" }}>
          <div className="container mb-5"><div className="text-center"><h2 className="h2 font_about fw-bold mb-0">Why <span className="font_stylish text-orange-force">choose us</span></h2></div></div>
          
          <div className="marquee-container-fix">
            <div className="marquee-content-fix">
              {[...activeWhyChooseUsData, ...activeWhyChooseUsData, ...activeWhyChooseUsData, ...activeWhyChooseUsData].map((item, idx) => {
                const IconComponent = ICON_MAP[item.icon] || FaCheckCircle;
                return (
                  <div key={idx} className="bg-white p-4 rounded-4 shadow-sm text-center flex-shrink-0 mx-3" style={{ width: "220px", height: "180px", transition: "transform 0.3s ease" }}>
                    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px", backgroundColor: "#fff4ed", borderRadius: "50%" }}>
                      <IconComponent size={32} color="#ff914d" />
                    </div>
                    <p className="fw-bold mt-2 font-poppins text-dark" style={{ fontSize: "15px" }}>{item.title}</p>
                    {item.description && <p className="small text-muted mb-0">{item.description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection placeholderHeight="700px">
        <div className="pt-5 my-5 designidea" style={{ backgroundImage: `url(${content[1]?.json_content?.image})` }}>
          <div className="container">
            <div className="mb-5 text-center">
              <h2 className="h2 font_about fw-bold mb-0">{content[1]?.json_content?.title} <span className="font_stylish text-orange-force d-block mt-1">{content[1]?.json_content?.description}</span></h2>
            </div>
            <div className="row g-4 mobile-scroll-row">
              <div className="col-lg-6 col-md-6 col-12"><RoomOfice cardRoomOffice={"card card_room border-0 h-100"} badge_circle="badge_circleblack" arrowIcon="images/arrow_icon.png" altArrow="arrow" width="80" imageRoom_Office={content[15]?.json_content?.image} roomImg="residential_imgs" altImage="room" cardBody="card_body office_card_body" cardTitle={content[15]?.json_content?.title} cardText={content[15]?.json_content?.description} btnText="Know More " btnLink={content[15]?.json_content?.designation} btnClass={"btn_knowmoreblack"} /></div>
              <div className="col-lg-6 col-md-6 col-12"><RoomOfice cardRoomOffice={"card card_room border-0 h-100"} badge_circle="badge_circleblack" arrowIcon="images/arrow_icon.png" altArrow="arrow" width="80" imageRoom_Office={content[14]?.json_content?.image} roomImg="residential_imgs" altImage="room" cardBody="card_body office_card_body" cardTitle={content[14]?.json_content?.title} cardText={content[14]?.json_content?.description} btnText="Know More " btnLink={content[14]?.json_content?.designation} btnClass={"btn_knowmoreblack"} /></div>
            </div>
          </div>
        </div>
      </LazySection>

      <LazySection placeholderHeight="400px">
        <section className="my-5">
          <div className="container">
            <div className="mx-0 mb-5 row justify-content-center text-center">
              <div className="col-12 d-flex flex-column align-items-center gap-2"><span className="font_stylish text-orange-force mb-0">Ready To Go Designs</span><h2 className="h2 font_about fw-bold mb-0">with Our Exclusive Design Choices</h2></div>
            </div>
            <SliderCard />
          </div>
        </section>
      </LazySection>

      <LazySection placeholderHeight="800px">
        <div className="my-5 bgsectionroom">
          <div className="container ">
            <div className="row mx-0 mb-4 text-center">
               <div className="col-12 px-0"><span className="font_stylish text-orange-force d-block mb-1">Designer&apos;s Choice:</span><h2 className="h2 font_about fw-bold mb-0">Exclusive Design Specials</h2></div>
            </div>
            <div className="mt-4 row g-4 mx-0 mobile-scroll-row">
              {staticRecords.map((record, i) => (
                <div className={`col-lg-${i === 0 || i === 3 ? '5' : i === 4 ? '12' : '7'} col-md-6 col-12`} key={record.id}>
                  <BgImageCard style={{ backgroundImage: `url(${record?.child_content?.image})` }} cardLinkTag={`/designer-choice/gallery?id=${record?.id}`} designerCardBgDiv={"designercard designercardimg1"} titleBgImage={record?.child_content?.title} descriptionBg={record?.child_content?.description} />
                </div>
              ))}
            </div>
            <div className="mt-4 col-lg-12 text-end pe-3"><a href="/designer-choice" className="know_more">Know More</a></div>
          </div>
        </div>
      </LazySection>

      <LazySection placeholderHeight="300px">
        <CounterRow 
          ImgCounter={content[13]?.json_content?.image} 
          imgAltCounter={content[13]?.json_content?.title} 
          titleHeadingCounter="Celebrating Excellence:"
          subHeadingCounter=""
          counterEnd={content[12]?.json_content?.title} 
          label1={content[12]?.json_content?.description} 
          counterDuration="5" 
          counterEnd2={content[11]?.json_content?.title} 
          label2={content[11]?.json_content?.description} 
          counterDuration2="5" 
          counterEnd3={content[10]?.json_content?.title} 
          label3={content[10]?.json_content?.description} 
          counterDuration3="5" 
          counterEnd4={content[9]?.json_content?.title} 
          label4={content[9]?.json_content?.description} 
          counterDuration4="5" 
          descriptionCounter={content[13]?.json_content?.description} 
          btnLink="/residential-projects" 
          textAboutBtnCounter="View Our Projects" 
          btnLink2={content[13]?.json_content?.designation} 
          textAboutBtnCounter2="All Services" 
        />
      </LazySection>

      <LazySection placeholderHeight="600px">
        <div className="savedesign my-5">
          <div className="container">
            <div className="mb-5 text-center d-flex flex-column gap-2">
              <span className="font_stylish text-orange-force mb-0">{content[8]?.json_content?.title}</span>
              <h2 className="h2 font_about fw-bold mb-0">{content[8]?.json_content?.description}</h2>
            </div>
            <div className="row justify-content-center g-4 mx-0 mobile-scroll-row">
              {finalMarqueeCards.slice(0, 5).map((card, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <div className="mx-auto" style={{ maxWidth: "380px", height: "100%" }}>
                    <Card cardLinkName={card?.link || `/estimator-for-home`} cardNameALl="cardoffer shadow-sm border-0 bg-white h-100 d-flex flex-column" imgSrc={card?.image || card?.child_content?.image} imgAlt={card?.title || card?.child_content?.title} imgClass={"bhkimg rounded-top-3 w-100 object-fit-cover"} titleCard={card?.title || card?.child_content?.title} titleClass="text-center mb-0 pb-3 pt-3 fw-bold fs-4 text-orange-force flex-grow-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LazySection>

      {activeEstimateBanner.is_active !== false && (
        <LazySection placeholderHeight="600px">
          <section className="my-5 py-5 estimate-fix-wrapper" style={{ backgroundColor: "#fff9f9", borderTop: "1px solid #ffeeee", borderBottom: "1px solid #ffeeee" }}>
            <EstimateCalculator cmsData={activeEstimateBanner} />
          </section>
        </LazySection>
      )}

      <LazySection placeholderHeight="500px">
        <div className="my-5 blogs_wrapper">
          <div className="container">
            <h2 className="h2 pb-4 text-center font_about fw-bold">Blogs</h2>
            <div className="row g-2 g-lg-4 justify-content-center mx-1 mobile-scroll-row">
              {blogs.map((blog, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <Blogs blogCard="blog_cards" imgSrcBlog={blog?.image || "/images/default.jpg"} blogImglink={`/${blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`}`} blogImgALt={blog?.title || "Blog Image"} blogClassImg="card-img-top rounded-4 object-fit-cover" blogdate={blog?.published_on ? formatDate(blog.published_on) : "Date not available"} blogTitle={blog?.title || "Untitled Blog"} blogDescription={blog?.description || "No description available"} buttonBlog="Continue Reading" blogBtnHref={`/${blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`}`} writer_name={blog?.writer_name || "High Creation"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LazySection>

      <hr />
      
      <LazySection placeholderHeight="400px">
        <section className="my-5 yt-fix-wrapper">
          <div className="mb-5 text-center"><span className="font_stylish text-orange-force">What People Say</span></div>
          <VideoTestimonialSlider />
        </section>
      </LazySection>
      
      <hr />

      <LazySection placeholderHeight="600px">
         <ContactForm mapSrc={content[3]?.json_content?.description} />
      </LazySection>

      <hr />
    </>
  );
}