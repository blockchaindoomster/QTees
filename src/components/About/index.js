import qt1 from '../../img/qtees-1.jpeg'

function About() {
  return (
    <section className="about section-padding">
        <div className="container">
            <div className="row">
                <div className="col-md-6 mb-30 animate-box" data-animate-effect="fadeInUp">
                    <h2 className="section-title">About <span>QTees</span></h2>
                    <p>
                        Welcome to QTees the cutest collection on the blockchain. QTees are half magical marshmellow and half alien robot which turned into the cutest creature to exist. Their only purpose is to have fun and bring good energy into the world

                    </p>
                </div>
                <div className="col-md-6 animate-box" data-animate-effect="fadeInUp">
                    <div className="about-img">
                        <div className="img"> <img src={qt1} className="img-fluid" alt="" /> </div>
                        <div className="about-img-2 about-buro">QTees</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About