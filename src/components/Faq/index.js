import {useState} from 'react'
function Faq() {
    const [faqState, setFaqState] = useState(1)
  return (
    <section className="pb-90">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="section-title"><span>Faqs</span></h2>
                </div>
                <div className="col-md-12">
                    <ul className="accordion-box clearfix">
                        <li className="accordion block active-block">
                            <div className={faqState === 1 ? "acc-btn active" : "acc-btn"} onClick={() => setFaqState(1)}>What is a QT</div>
                            <div className={faqState ===1 ? "acc-content current" : "acc-content"}>
                                <div className="content">
                                    <div className="text">
                                        <p className="pt-2 pb-0 mb-0">Half magic marshmellow <br/> half alien robot <br /> 100% love</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="accordion block">
                            <div className={faqState === 2 ? "acc-btn active" : "acc-btn"} onClick={() => setFaqState(2)}>How much will mint be</div>
                            <div className={faqState ===2 ? "acc-content current" : "acc-content"}>
                                <div className="content">
                                    <div className="text">
                                        <p className="pt-2 pb-0 mb-0">.03 eth</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="accordion block">
                            <div className={faqState === 3 ? "acc-btn active" : "acc-btn"} onClick={() => setFaqState(3)}>What blockchain will this be on</div>
                            <div className={faqState ===3 ? "acc-content current" : "acc-content"}>
                                <div className="content">
                                    <div className="text">
                                        <p className="pt-2 pb-0 mb-0">Ethereum</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="accordion block">
                            <div className={faqState === 4 ? "acc-btn active" : "acc-btn"} onClick={() => setFaqState(4)}>How many QTees will there be</div>
                            <div className={faqState ===4 ? "acc-content current" : "acc-content"}>
                                <div className="content">
                                    <div className="text">
                                        <p className="pt-2 pb-0 mb-0">10,000</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Faq