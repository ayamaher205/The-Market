export default function CategoriesSection() {
  return (
    <>
      <section className="categories">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div
                className="categories__item categories__large__item set-bg h-100"
                style={{
                  backgroundPosition: "cover",
                  "background-image":
                    "url('https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <div className="categories__text">
                  <h1>Women’s fashion</h1>
                  <p>
                    Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                    incidid-unt labore edolore magna aliquapendisse ultrices
                    gravida.
                  </p>
                  <a href="/shop">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{
                      "background-image":
                        "url('img/categories/category-2.jpg')",
                    }}
                  >
                    <div className="categories__text">
                      <h4>Men’s fashion</h4>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{
                      "background-image":
                        "url('img/categories/category-3.jpg')",
                    }}
                  >
                    <div className="categories__text">
                      <h4>Kid’s fashion</h4>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{
                      "background-image":
                        "url('img/categories/category-5.jpg')",
                    }}
                  >
                    <div className="categories__text">
                      <h4>Cosmetics</h4>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{
                      "background-image":
                        "url('img/categories/category-4.jpg')",
                    }}
                  >
                    <div className="categories__text">
                      <h4>Accessories</h4>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
