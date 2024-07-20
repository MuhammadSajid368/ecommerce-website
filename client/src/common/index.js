const backendApi = "http://localhost:8000"

const SummaryApi = {
  signin: {
    url: `${backendApi}/auth/signin`,
    method: "post"
  },
  signup: {
    url: `${backendApi}/auth/pre-signup`,
    method: "post"
  },
  logout: {
    url: `${backendApi}/auth/userLogout`,
    method: 'get'
  },
  allUsers: {
    url: `${backendApi}/auth/all-users`,
    method: 'get'
  },
  updateUser: {
    url: `${backendApi}/auth/update-user`,
    method: 'post'
  },
  uploadProduct: {
    url: `${backendApi}/product/upload-product`,
    method: 'post'
  },
  allProducts: {
    url: `${backendApi}/product/get-products`,
    method: 'get'
  },
  updateProduct: {
    url: `${backendApi}/product/update-product`,
    method: 'post'
  },
  categoreyProduct: {
    url: `${backendApi}/product/get-categoryProduct`,
    method: 'get'
  },
  categoreyWiseProduct: {
    url: `${backendApi}/product/categorey-product`,
    method: 'post'
  },
  productDetails: {
    url: `${backendApi}/product/product-details`,
    method: 'post'
  },
  addToCart: {
    url: `${backendApi}/cart/addtocart`,
    method: 'post'
  },
  addTOCartProductCount: {
    url: `${backendApi}/cart/countAddToCartProduct`,
    method: 'get'
  },
  addToCartProductView: {
    url: `${backendApi}/cart/view-card-product`,
    method: 'get'
  },
  updateCartProduct: {
    url: `${backendApi}/cart/update-cart-product`,
    method: 'post'
  },
  deleteCartProduct: {

    url: `${backendApi}/cart/delete-cart-proudct`,
    method: 'post'
  },
  searchProduct: {
    url: `${backendApi}/product/search`,
    method: 'get'
  },
  filterProduct: {
    url: `${backendApi}/product/filter-product`,
    method: 'post'
  }
}
export default SummaryApi;
