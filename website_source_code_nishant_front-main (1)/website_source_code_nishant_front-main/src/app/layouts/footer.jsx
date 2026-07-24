"use client";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaPinterest
} from "react-icons/fa";
import api from "@/utils/api";
import { useEffect, useState } from "react";

const Footer = () => {
  const [footerlink, setData] = useState([]);
  const [settings, setSettings] = useState({});
  const currentYear = new Date().getFullYear(); 
  
  useEffect(() => {
    // 1. Fetch Footer Links
    const fetchfooterlink = async () => {
      try {
        const response = await api.get("/footer-link");
        
        const priorityOrder = [
          "Noida", 
          "Ghaziabad", 
          "Greater Noida", 
          "Delhi", 
          "Dwarka", 
          "Faridabad", 
          "Gurugram", 
          "Manesar"
        ];

        const sortedLinks = response.data.sort((a, b) => {
          const indexA = priorityOrder.findIndex(city => 
            a.title.toLowerCase().includes(city.toLowerCase())
          );
          const indexB = priorityOrder.findIndex(city => 
            b.title.toLowerCase().includes(city.toLowerCase())
          );
          
          const safeIndexA = indexA === -1 ? 999 : indexA;
          const safeIndexB = indexB === -1 ? 999 : indexB;
          
          return safeIndexA - safeIndexB;
        });

        setData(sortedLinks);
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };

    // 2. Fetch Site Settings
    const fetchSiteSettings = async () => {
      try {
        const response = await api.get("/site-settings");
        let rawData = response.data?.data || response.data;
        const settingsData = Array.isArray(rawData) ? rawData[0] : rawData;
        
        if(settingsData) {
          setSettings(settingsData);
        }
      } catch (err) {
        console.error("Error fetching Site Settings:", err);
      }
    };

    fetchfooterlink();
    fetchSiteSettings();
  }, []);

  return (
    <>
      {/* INJECTED STYLES FOR FOOTER SPECIFICS */}
      <style dangerouslySetInnerHTML={{__html: `
        .footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #f1f5f9;
          color: #475569;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .footer-social-btn:hover { transform: translateY(-4px); }
        .footer-social-btn.fb:hover { background-color: #1877F2; color: white; box-shadow: 0 6px 12px rgba(24, 119, 242, 0.3); }
        .footer-social-btn.ig:hover { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); color: white; box-shadow: 0 6px 12px rgba(214, 36, 159, 0.3); }
        .footer-social-btn.tw:hover { background-color: #000000; color: white; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); }
        .footer-social-btn.in:hover { background-color: #0A66C2; color: white; box-shadow: 0 6px 12px rgba(10, 102, 194, 0.3); }
        .footer-social-btn.pi:hover { background-color: #E60023; color: white; box-shadow: 0 6px 12px rgba(230, 0, 35, 0.3); }
        .footer-social-btn.yt:hover { background-color: #FF0000; color: white; box-shadow: 0 6px 12px rgba(255, 0, 0, 0.3); }
        
        .footer-address-link {
          transition: color 0.3s ease;
          color: #171717;
          text-decoration: none;
        }
        .footer-address-link:hover {
          color: #ff914d !important;
        }
      `}} />

      <div className="footer_wrapper pb-0 position-relative">
        <div className="container">
          <div className="py-5 pb-0 mx-0 row justify-content-center">
            <div className="col-lg-10">
              <div className="row justify-content-lg-center g-4">
                <div className="col-lg-4 ps-lg-5 col-md-5 col-6">
                  <div>
                    <a href="/" aria-label="Home">
                      <Image
                        src="/images/new_hc_logo.avif"
                        alt="High Creation Interior Logo"
                        width={150}
                        height={150}
                        priority
                        data-no-lazy="1"
                      />
                    </a>
                  </div>
                  <div className="pt-3">
                    <h6 className="font-outfit fw-bold text-dark">EMAIL US</h6>
                    <p className="mb-0">
                      <a href={`mailto:${settings?.email || 'Info@hcinterior.in'}`} className="text-black p-2 m-n2 d-inline-block font-poppins">
                        {settings?.email || 'Info@hcinterior.in'}
                      </a>
                    </p>
                  </div>
                  <div>
                    <h6 className="pt-3 font-outfit fw-bold text-dark">FOR QUERY</h6>
                    {/* Fixed missing hover effect by wrapping in p tags to match globals.css logic */}
                    <p className="mb-0">
                      <a href={`tel:${settings?.phone || '+918527750562'}`} className="text-black p-2 m-n2 d-inline-block fw-medium font-poppins">
                        {settings?.phone || '+91 8527750562'}
                      </a>
                    </p>
                    <p className="mb-0 mt-1">
                      <a href="tel:+917070701373" className="text-black p-2 m-n2 d-inline-block fw-medium font-poppins">
                        +91 7070701373
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-6">
                  <h4 className="footer_heading font-outfit fw-bold text-dark">High creation</h4>
                  <ul className="list-unstyled ps-0 font-poppins">
                    <li className="footer_li"><a href="/about-us/" className="text-black">About Us</a></li>
                    <li className="footer_li"><a href="/services/" className="text-black">Service area</a></li>
                    <li className="footer_li"><a href="/how-its-works/" className="text-black">How Its Works</a></li>
                    <li className="footer_li"><a href="/team/" className="text-black">Team</a></li>
                    <li className="footer_li"><a href="/career/" className="text-black">Career</a></li>
                    <li className="footer_li"><a href="/contact/" className="text-black">Contact Us</a></li>
                    <li className="footer_li"><a href="/refer-and-earn/" className="text-black">Refer And Earn</a></li>
                    <li className="footer_li"><a href="/faq/" className="text-black">FAQ</a></li>
                    <li className="footer_li"><a href="/blog" className="text-black">Blogs</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 ps-lg-4 col-md-3 col-6">
                  <h4 className="footer_heading font-outfit fw-bold text-dark">Gallery</h4>
                  <ul className="list-unstyled ps-0 font-poppins">
                    {footerlink.map((query, index) => (
                      <li key={index} className="footer_li">
                        <a href={query.web_url} className="text-black">
                          {query.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-3 col-md-12 col-6">
                  <h4 className="footer_heading font-outfit fw-bold text-dark">Branch Office</h4>
                  <ul className="list-unstyled font-poppins">
                    
                    {/* Corporate Office */}
                    <li className="footer_li pb-1 pt-2">
                      <h6 className="mb-1 text-dark fw-bold font-outfit" style={{ fontSize: "15px" }}>Corporate Office:</h6>
                      <a
                        href="https://share.google/NsJByald2Vm8Q2DRJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-address-link d-block pb-2"
                        style={{ lineHeight: "1.5", fontSize: "14px" }}
                      >
                        H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301
                      </a>
                    </li>

                    {/* Experience Centers */}
                    <li className="footer_li pb-1 pt-2">
                      <h6 className="mb-1 text-dark fw-bold font-outfit" style={{ fontSize: "15px" }}>Experience Center:</h6>
                      
                      <a
                        href="https://share.google/LMhkJflVZey0KDXS8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-address-link d-block pb-2"
                        style={{ lineHeight: "1.5", fontSize: "14px" }}
                      >
                        H101, LGF, Sector-63, Noida, Uttar Pradesh- 201301
                      </a>
                      
                      {/* <span className="text-dark d-block pb-2" style={{ lineHeight: "1.5", fontSize: "14px" }}>
                        4th Floor, Jmd Galleria Mall, Unit Nos. 402, Sector-47 & 48, Sohna - Gurgaon Rd, Gurugram, Haryana 122001
                      </span> */}

                      <a
                        href="https://share.google/C9uQKfphGOlrhlUuM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-address-link d-block pb-2"
                        style={{ lineHeight: "1.5", fontSize: "14px" }}
                      >
                        DDC Arcade, 1st Floor, Plot No 1 Main, Sector 48 Road, Badshahpur Sohna Rd, Opposite Vipul Business Park, Gurugram, Haryana 122018
                      </a>

                      <a
                        href="https://share.google/mJMlqcOZ0249JEpN6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-address-link d-block pb-2"
                        style={{ lineHeight: "1.5", fontSize: "14px" }}
                      >
                        1st Floor, Plot No 24, near old Faridabad Metro Station, Sector 20A, Faridabad, Haryana 121002
                      </a>
                    </li>

                    {/* Workshop */}
                    <li className="footer_li pb-2 pt-2">
                      <h6 className="mb-1 text-dark fw-bold font-outfit" style={{ fontSize: "15px" }}>Workshop:</h6>
                      <span className="text-dark d-block pb-2" style={{ lineHeight: "1.5", fontSize: "14px" }}>
                        Plot No-3, Sorkha Village , Sector-115, Noida, Uttar Pradesh- 201301
                      </span>
                      {/* NEW ADDRESS ADDED HERE
                      <span className="text-dark d-block" style={{ lineHeight: "1.5", fontSize: "14px" }}>
                      4th Floor, Jmd Galleria Mall, Unit Nos. 402, Sector-47 & 48, Sohna - Gurgaon Rd, Gurugram, Haryana 122001
                      </span> */}
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="footer_copyright pt-0 mt-0 px-3 px-lg-0 position-relative">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <ul className="list-unstyled d-flex mb-0 font-poppins">
                  <li className="footer_li pe-3 border-end">
                    <a href="/privacy-policy/" className="footer-policy-link">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="footer_li pe-3 border-start ps-3">
                    <a href="/term-and-condition/" className="footer-policy-link">
                      Terms & Condition
                    </a>
                  </li>
                  <li className="footer_li pe-3 border-start ps-3">
                    <a href="/cancelletion-policy/" className="footer-policy-link">
                      Cancellation Policy
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="mb-0 team_description text-center pt-2 pt-lg-0 font-poppins" style={{ fontSize: "13px" }}>
                  All Rights Reserved ©{currentYear} High Creation Interior Projects Private Limited
                </p>
              </div>

              <div className="m-auto m-lg-0 text-center">
                <div className="social-links d-flex gap-2 justify-content-center my-3">
                    {(settings?.facebook_url || "https://www.facebook.com/HighCreationInteriorProjectsPvtLtd") && (
                        <a href={settings?.facebook_url?.trim() || "https://www.facebook.com/HighCreationInteriorProjectsPvtLtd"} target="_blank" rel="noopener noreferrer" className="footer-social-btn fb" aria-label="Facebook">
                            <FaFacebookF size={18} />
                        </a>
                    )}
                    {(settings?.instagram_url || "https://www.instagram.com/highcreationinterior/") && (
                        <a href={settings?.instagram_url?.trim() || "https://www.instagram.com/highcreationinterior/"} target="_blank" rel="noopener noreferrer" className="footer-social-btn ig" aria-label="Instagram">
                            <FaInstagram size={18} />
                        </a>
                    )}
                    {(settings?.twitter_url || "https://x.com/HC_Interior") && (
                        <a href={settings?.twitter_url?.trim() || "https://x.com/HC_Interior"} target="_blank" rel="noopener noreferrer" className="footer-social-btn tw" aria-label="X (Twitter)">
                            <FaTwitter size={18} />
                        </a>
                    )}
                    {(settings?.linkedin_url || "https://www.linkedin.com/company/high-creation-interior-projects-private-limited/") && (
                        <a href={settings?.linkedin_url?.trim() || "https://www.linkedin.com/company/high-creation-interior-projects-private-limited/"} target="_blank" rel="noopener noreferrer" className="footer-social-btn in" aria-label="LinkedIn">
                            <FaLinkedin size={18} />
                        </a>
                    )}
                    {settings?.pinterest_url && (
                        <a href={settings.pinterest_url.trim()} target="_blank" rel="noopener noreferrer" className="footer-social-btn pi" aria-label="Pinterest">
                            <FaPinterest size={18} />
                        </a>
                    )}
                    {settings?.youtube_url && (
                        <a href={settings.youtube_url.trim()} target="_blank" rel="noopener noreferrer" className="footer-social-btn yt" aria-label="YouTube">
                            <FaYoutube size={18} />
                        </a>
                    )}
                </div>
              </div>
            </div>
            <hr />

            <p className="text-lg-end text-center team_description text-dark font-poppins" style={{ fontSize: "13px" }}>
             {`Designed By ` } 
              <a href="#" className="text-black fw-bold text-decoration-none">
                HC Interior
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;