import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-7">
              <div className="footer__about">
                <div className="footer__logo">
                  <Link to="./index.html">
                    <img src="img/logo.png" alt="" />
                  </Link>
                </div>
                <p>
    Ashion Shop is your go-to destination for the latest and greatest in clothes, electronics, and more. 
Our mission is to provide high-quality products at unbeatable prices, ensuring a seamless and enjoyable shopping experience for all our customers. 
From exclusive deals to fast and reliable shipping, we strive to make your shopping journey as effortless and rewarding as possible. 
Trust our shop for all your shopping needs – where quality meets convenience.
                </p>
               
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5">
              <div className="footer__widget">
               
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="footer__widget">
               
              </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-8">
              <div className="footer__newslatter">
                               
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__copyright__text">
                <p>
                  Copyright &copy;{" "}
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved {" "}
                  <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
