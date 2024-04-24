import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


const Contact = () => {
  return (
    <section className="contact">
      <header className='header-banner'>
          <div className='overlay'></div>
          <div className='animated-texts overlay-content'>
              <h1>Welcome to <span className="hotel-color">Nexus Tiles</span></h1>
              <h4>Experience the Premium Designs Collection in SriLanka</h4>
          </div>
        
      </header>
      <div className="container-about">
            <h1>Contact Us</h1>
            <p>Get in touch with our team of experts at NEXUS-TILES if you need assistance in choosing the right tile based on your preferences and design aesthetics.</p>
          

          <div className="contact-form">
                <form >
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Full Name(Required)</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Full Name" />
                    <small id="emailHelp" className="form-text text-muted">We wll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Subject(Optional)</label>
                    <input type="text" className="form-control" id="subject" placeholder="Enter your subject" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Phone Number(Required)</label>
                    <input type="text" className="form-control" id="phone" placeholder="Enter your Phone Number" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email(Required)</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter your Email" />
                  </div>
                
                  <button type="submit" className="btn btn-primary mt-5 mb-5">Submit</button>
                </form>
                <p>Hello!</p>

          </div>
      </div>
      <div className="contact-info">
        <Container>
                  <Row className="gx-4 gy-4">
                    <Col>
                    <header className='header-banner'>
                    </header>
                    </Col>
                    <Col className='align-items-center'>
                      <div className="about-box-info">
                        <h3>Address:</h3> 
                        <p>No: 25, Nawala Road, Narahenpita, Colombo 5</p>
                      </div>
                      <div className="about-box-info">
                        <h3>Customer Support:</h3>
                        <p>011 7 622822</p>
                      </div>
                      <div className="about-box-info">
                        <h3>General Inquiries:</h3>
                        <p>info@nexus-tiles.com</p>
                        
                      </div>
                    </Col>
                  </Row>
        </Container>
      </div>

    </section>
  )
}

export default Contact