import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


const About = () => {
  return (
    <section className='about-nexus'>
          <header className='header-banner'>
          <div className='overlay'></div>
          <div className='animated-texts overlay-content'>
              <h1>Welcome to <span className="hotel-color">Nexus Tiles</span></h1>
              <h4>Experience the Premium Designs Collection in SriLanka</h4>
          </div>
        
          </header>
          <div className="container-about">
            <h1>About Nexus Tiles</h1>
            <p>Tiling the way to the future, NEXUS-TILES is a premier tile manufacturer in Sri Lanka.Established since 1977, the company has made its mark both locally and globally for its unique designs that amalgamate the best material, technology, industrial expertise and creativity to create tiles athat are of the highest quality and authenticity.</p>
            <p>Our wall & floor tiles are available in a range of colors, sizes and textures; all of which are made with the highest quality material using state-of the-art technology.While seeking inspiration for our unique collections from Sri Lankan lush natural surroundings.our production process is carried out by taking steps to safeguard our environment and by using green technology.</p>
            <div className="about-info">
                <Container>
                  <Row className="gx-4 gy-4">
                    <Col>
                      <div className="about-box">
                        <h1>Vision</h1>
                        <p>Creating a fine art of living</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <h1>Mission</h1>
                        <p>Creating contemporary fashinable lifestyles for our customers while adding value to our stakeholders by excelling in evrything we do with the strength of our inherited values.</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <h1>Values</h1>
                        <p>
                          <li>Quality</li>
                          <li>Trust</li>
                          <li>Sense of Heritage</li>
                          <li>Long standing Relationships</li>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
            </div>
          </div>
          <header className='header-banner'>
          </header>

          <div className="container-about">

            <div className="about-info">
                <Container>
                  <Row className="gx-4 gy-4">
                    <Col>
                      <div className="about-box">
                        <h1>650+</h1>
                        <h4>SKU&aposs</h4>
                        <p>Creating a fine art of living</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <h1>56</h1>
                        <h4>Showrooms</h4>
                        <p>Visit our nearest showroom.</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <h1>03</h1>
                        <h4>Sub Brands</h4>
                        <p>Catering to your lifestyle needs.</p>
                        
                      </div>
                    </Col>
                  </Row>
                </Container>
            </div>
            <p className='mt-5'>We deliver a comprehensive tile package that meets our customers requirements.</p>
            <p className='mt-2 mb-4'>Our high-quality tiles with attractive, unique designs are made in line with international quality standards, conforming to ISO 13006, and exported to countries around the world.Additionally, we have obtained the GREENSL™ Label(GREENSL™STAR) from the Green Building Council of Sri Lanka(GBCSL), which is the local representative of the world Green building council for our entire collection of wall and floor Tiles.</p>
            <p className='mt-2'></p>

            <div className="about-certifications mt-3">
                <Container>
                  <Row className="gx-4 gy-4 mt-3">
                    <Col>
                      <div className="about-box">
                        <h4>Download Nexus Tiles PLC Environmental Policy</h4>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <p><a href='google.com' className='text-decoration-none'>Download</a></p>
                      </div>
                    </Col>
              
                  </Row>

                  <Row className="gx-4 gy-4 mt-3">
                    <Col>
                      <div className="about-box">
                        <h4>Download Nexus Tiles PLC ISO 14001 Certification</h4>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <p><a href='google.com' className='text-decoration-none'>Download</a></p>
                      </div>
                    </Col>
              
                  </Row>

                  <Row className="gx-4 gy-4 mt-3">
                    <Col>
                      <div className="about-box">
                        <h4>Download Nexus Tiles Annual Report 2021/22</h4>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <p><a href='google.com' className='text-decoration-none'>Download</a></p>
                      </div>
                    </Col>
              
                  </Row>

                  <Row className="gx-4 gy-4 mt-3">
                    <Col>
                      <div className="about-box">
                        <h4>Download Nexus Tiles Annual Report 2022/23</h4>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <p><a href='google.com' className='text-decoration-none'>Download</a></p>
                      </div>
                    </Col>
              
                  </Row>
                </Container>
            </div>
          </div>
          
          
    </section>
  )
}

export default About