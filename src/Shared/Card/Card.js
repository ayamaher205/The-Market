export default function Card({product}) {
  return (
    
    <>
        <div class="col-lg-3 col-md-4 col-sm-6 mix">
              <div class="product__item">
                <div
                  class="product__item__pic set-bg"
                  data-setbg="img/product/product-1.jpg"
                >
                  <div class="label new">New</div>
                  <ul class="product__hover">
                    <li>
                      <a href="img/product/product-1.jpg" class="image-popup">
                        <span class="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="product__item__text">
                  <h6>
                    <a href="#">{product.name}</a>
                  </h6>
                  {/* <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div> */}
                  <div class="product__price">$ {product.price}</div>
                </div>
              </div>
            </div>
    </>
  );
}