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
                  <Row>
                    <Col>
                      <div className="about-box">
                        <h1>Vision</h1>
                        <p>Creating a fine art of living</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <h1>Mission</h1>
                        <p>Creating contemporary fashinable lifestyles for our customers while adding value to our stakeholders</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="about-box">
                        <h1>Title 3</h1>
                        <p>Content for Box 3</p>
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