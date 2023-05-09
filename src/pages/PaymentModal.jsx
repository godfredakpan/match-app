/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import './PaymentModal.css';
import PaymentForm from "./Checkout";

export default function PaymentModal() {

    return (
        <>
            <div className="col-md-12">
                <div className="">
                    <div className="modal-container" style={{marginTop: '20px'}}>
                        <h2 className="out">You're out of messages</h2>
                        <p className="accent">This is NOT a subscription.<br />
                            Your credit card will NOT be re-billed.        </p>
                        {/* <h3 className="center">Select a package:</h3> */}
                        
                        <div className="row">
                        <span className="payment-limited-header" data-testid="payment-error">Limited Offer</span>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">4 units</h5>
                                        <p className="card-text">$ 6,00</p>
                                        <PaymentForm amount={6} totalMessage={4} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">17 units</h5>
                                        <p className="card-text">$ 9.9</p>
                                        <PaymentForm amount={9.9} totalMessage={17}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">310 units</h5>
                                        <p className="card-text">$ 299</p>
                                        <PaymentForm amount={299} totalMessage={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">110 units</h5>
                                        <p className="card-text">$ 149,00</p>
                                        <PaymentForm amount={149} totalMessage={52} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">60 units</h5>
                                        <p className="card-text">$ 99,00</p>
                                        <PaymentForm amount={99} totalMessage={60} />
                                    </div>
                                </div>
                            </div>
                            <span className="payment-limited-header" data-testid="payment-error">Most Popular</span>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">30 units</h5>
                                        <p className="card-text">$ 49.9</p>
                                        <PaymentForm amount={49.9}  totalMessage={30} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">10 units</h5>
                                        <p className="card-text">$ 19.9</p>
                                        <PaymentForm amount={19.9}  totalMessage={10} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">5 units</h5>
                                        <p className="card-text">$ 9.95</p>
                                        <PaymentForm amount={9.95}  totalMessage={5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="payment-footer" data-testid="footer-payment">
                            <strong>100% secure and discrete payments:</strong><br />
                            We care about your private life and respect your privacy.            Any charges made on your credit card will appear under:            <i className="fa fa-check"></i>            <br />
                            <strong>Need assistance? Send us an email:</strong><br />
                            <span className="contact-adress">sales@flirtdatingmatch.com</span>
                        </p>
                        <p className="payment-footer">
                            By clicking   "Secure purchase"
                            you agree with our  <a className="is-underline" href="/" target="_blank" style={{display: 'inline'}}>
                                Terms &amp; conditions  </a>
                        </p>
                        <a className="modal-close" data-popup-close="" data-units-close=""><i className="fa fa-chevron-left"></i></a>
                    </div>
                </div>
            </div>
        </>
    );
}
