import MainLayout from "../layouts/MainLayout";
import BackgroundImageRow from "../components/BackgroundImageRow";
import { defaultAltText } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

// 🌟 IMPORT OUR GLOBAL PREMIUM TEXT EXPANDER
import ExpandableRichText from "../components/ModernPara";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Services Data ---
async function getServiceData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-city`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch services: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Services Fetch Error:", err);
    return [];
  }
}

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/services" ||
          tag.page_name?.endsWith("/services")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata() {
  const seoData = await getSeoData();

  const defaultTitle = "Our Taganting Site Services Page";
  const defaultDesc = "Our Taganting Site Services Page";
  const defaultCanonical = "https://hcinterior.in/services";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    openGraph: {
      title: seoData?.title || defaultTitle,
      description: seoData?.meta_description || defaultDesc,
      url: seoData?.page_name || defaultCanonical,
      type: "website",
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function Services() {
  // Fetch data
  const rawPageDataList = await getServiceData();

  // --- CLIENT REQUEST: SORTING LOGIC START ---
  const desiredOrder = [
    "noida",
    "ghaziabad",
    "greater noida",
    "delhi",
    "dwarka",
    "faridabad",
    "gurugram",
    "manesar"
  ];

  let pageDataList = [];
  if (rawPageDataList && Array.isArray(rawPageDataList)) {
    pageDataList = [...rawPageDataList].sort((a, b) => {
      const cityA = (a.city_type || "").toLowerCase().trim();
      const cityB = (b.city_type || "").toLowerCase().trim();

      const indexA = desiredOrder.indexOf(cityA);
      const indexB = desiredOrder.indexOf(cityB);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return 0;
    });
  }
  // --- CLIENT REQUEST: SORTING LOGIC END ---

  const fallbackImages = [
    "/images/services/1-min.png",
    "/images/services/2-min.png",
    "/images/services/3-min.png",
    "/images/services/4-min.png",
    "/images/services/5-min.png",
    "/images/services/6-min.png",
    "/images/services/8-min.png", 
    "/images/services/7-min.png",
  ];

  return (
    <MainLayout>
      {/* --- INJECT PREMIUM MODERN STYLES --- */}
      <style dangerouslySetInnerHTML={{__html: `
        :root { --hc-primary: #ff914d; --hc-dark: #0f172a; }
        .font-outfit { font-family: var(--font-outfit), sans-serif; }
        .font-poppins { font-family: var(--font-poppins), sans-serif; }
        
        .modern-service-row { padding: 4rem 0; border-bottom: 1px solid #f1f5f9; transition: background 0.3s ease; }
        .modern-service-row:hover { background: #fdfdfd; }
        .modern-service-row:last-child { border-bottom: none; }
        
        .service-img-wrapper { 
            position: relative; 
            width: 100%; 
            aspect-ratio: 4/3; 
            border-radius: 20px; 
            overflow: hidden; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.06); 
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }
        .modern-service-row:hover .service-img-wrapper {
            transform: translateY(-8px);
            box-shadow: 0 30px 50px rgba(0,0,0,0.12);
        }

        .service-img-wrapper img {
            transition: transform 0.7s ease;
        }
        .modern-service-row:hover .service-img-wrapper img {
            transform: scale(1.05);
        }

        .service-badge { 
            display: inline-block; 
            padding: 6px 16px; 
            background: #fff4ed; 
            color: var(--hc-primary); 
            border-radius: 30px; 
            font-size: 13px; 
            font-weight: 700; 
            letter-spacing: 1px; 
            text-transform: uppercase; 
            margin-bottom: 1rem; 
        }

        .btn-modern-primary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 28px;
            background: linear-gradient(135deg, var(--hc-dark) 0%, #1e293b 100%);
            color: white !important;
            font-weight: 600;
            border-radius: 30px;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
        }
        .btn-modern-primary:hover {
            background: linear-gradient(135deg, var(--hc-primary) 0%, #ff5722 100%);
            transform: translateY(-3px);
            box-shadow: 0 15px 25px rgba(255, 145, 77, 0.25);
        }

        /* Protect CMS content inside services */
        .service-rich-text { font-family: var(--font-poppins); color: #475569; line-height: 1.8; }
        .service-rich-text img { max-width: 100%; height: auto; border-radius: 12px; }
      `}} />

      <main>
        <BackgroundImageRow
          sectionBgImages={"sectionbg services"}
          sectionBgHeading="Services"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Explore a curated selection of premium living room interior designs and décor ideas at High Creation. We offer customizable, functional, and stylish solutions to elevate your living space. From modular TV units to wall art and innovative wall designs, find all the inspiration you need to transform your living room. Start browsing today to discover designs that perfectly reflect your personal style."
          secBgDesClass="secbgbesclass"
        />

        <div className="container py-5">
          {pageDataList && pageDataList.length > 0 ? (
            pageDataList.map((service, index) => {
              const fallbackImg = fallbackImages[index] || fallbackImages[index % fallbackImages.length];
              const isEven = index % 2 === 0;

              // --- URL ROUTING LOGIC ---
              const cityValue = service?.city_type?.toLowerCase().trim() || "";
              let citySlug = cityValue.replace(/[\s_]+/g, '-');
              
              if (citySlug === "gurugram") {
                citySlug = "gurgaon";
              }
              
              const targetLink = `/interior-designers-in-${citySlug}`;
              const safeDescription = service?.main_description || "";

              return (
                <div className="modern-service-row" key={service.id || index}>
                  <div className="row g-5 align-items-center">
                    
                    {/* IMAGE COLUMN */}
                    <div className={`col-lg-6 ${isEven ? 'order-lg-1' : 'order-lg-2'}`}>
                      <div className="service-img-wrapper">
                        <Image 
                          src={service?.location_image ?? fallbackImg} 
                          alt={service?.main_title ?? defaultAltText}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>

                    {/* CONTENT COLUMN */}
                    <div className={`col-lg-6 ${isEven ? 'order-lg-2' : 'order-lg-1'} ps-lg-5`}>
                      <span className="service-badge font-poppins">Premium Interiors</span>
                      <h2 className="font-outfit fw-bold text-dark mb-4" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', lineHeight: '1.2' }}>
                        {service?.main_title ?? `Interior Designers in ${cityValue.toUpperCase()}`}
                      </h2>
                      
                      {/* 🌟 GOD TIER EXPANDABLE TEXT COMPONENT 🌟 */}
                      <ExpandableRichText 
                        htmlContent={safeDescription} 
                        className="service-rich-text"
                        maxHeight={180} // Specifically setting height to keep UI incredibly clean before expand
                      />

                      <div className="mt-4">
                        <Link href={targetLink} className="btn-modern-primary font-poppins">
                          Explore Designs <FaArrowRight />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center my-5 py-5">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <p className="font-poppins text-muted">Loading premium services...</p>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}