function MyCarousel() {
  return (
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ marginLeft: 150,height:'70%', width: '80%' }}>
          <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
              <div className="carousel-item active">
                  <img src="http://localhost:3000/images/s2.png" className="d-block w-100" alt="First slide" style={{ height: '300px' }} />
              </div>
              <div className="carousel-item">
                  <img src="http://localhost:3000/images/s1.png" className="d-block w-100" alt="Second slide"  style={{ height: '300px' }}/>
              </div>
              <div className="carousel-item">
                  <img src="http://localhost:3000/images/sceen.png" className="d-block w-100" alt="Third slide"  style={{ height: '300px' }}/>
              </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
      </div>
  );
}

export default MyCarousel;

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
