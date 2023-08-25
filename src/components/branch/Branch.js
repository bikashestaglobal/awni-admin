import React, {
  Fragment,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import LeftNavigation from "./LeftNavigation";
import TopNavigation from "./TopNavigation";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { initialState, branchReducer } from "../../reducer/branchReducer";
import Profile from "./pages/Profile";
import PageNoteFound from "./pages/PageNotFound";

import ParentCategory from "./pages/ParentCategory";
import Category from "./pages/Category";

// ================   Products  =====================
import AddProduct from "./pages/products/AddProduct";
import ProductList from "./pages/products/ProductList";

// ================   Coupons  =====================
import AddCoupon from "./pages/coupons/AddCoupon";
import CouponList from "./pages/coupons/CouponList";
import EditCoupon from "./pages/coupons/EditCoupon";
import ShippingMethodList from "./pages/shippingMethod/ShippingMethodList";
import AddShippingMethod from "./pages/shippingMethod/AddShippingMethod";
import EditShippingMethod from "./pages/shippingMethod/EditShippingMethod";
import FlavourList from "./pages/flavours/FlavourList";
import AddFlavour from "./pages/flavours/AddFlavour";
import EditFlavour from "./pages/flavours/EditFlavour";
import ColorList from "./pages/colors/ColorList";
import AddColor from "./pages/colors/AddColor";
import EditColor from "./pages/colors/EditColor";
import EditProduct from "./pages/products/EditProduct";
import AdonProductList from "./pages/adonProducts/AdonProductList";
import EditAdonProduct from "./pages/adonProducts/EditAdonProduct";
import AddAdonProduct from "./pages/adonProducts/AddAdonProduct";
import DealsList from "./pages/deals/DealsList";
import AddDeals from "./pages/deals/AddDeals";
import EditDeals from "./pages/deals/EditDeals";
import PincodeList from "./pages/pincode/PincodeList";
import AddPincode from "./pages/pincode/AddPincode";
import EditPincode from "./pages/pincode/EditPincode";
import ShapeList from "./pages/shapes/ShapeList";
import AddShape from "./pages/shapes/AddShape";
import EditShape from "./pages/shapes/EditShape";
import NewOrders from "./pages/orders/NewOrders";
import CustomerList from "./pages/customers/CustomerList";
import ViewOrder from "./pages/orders/ViewOrder";
import OrderList from "./pages/orders/OrderList";
import Setting from "./pages/setting/Setting";
import MainSlider from "./pages/banners/MainSlider";
import NextToSlider from "./pages/banners/NextToSlider";
import DailyBestSaleBanner from "./pages/banners/DailyBestSaleBanner";
import CategoryPageBanner from "./pages/banners/CategoryPageBanner";
import OfferBanner from "./pages/banners/OfferBanner";
import ParCategoryList from "./pages/parentCategory/ParCategoryList";
import AddParentCategory from "./pages/parentCategory/AddParCategory";
import EditParCategory from "./pages/parentCategory/EditParCategory";

import AddSubCategory from "./pages/subCategory/AddSubCategory";
import EditSubCategory from "./pages/subCategory/EditSubCategory";
import SubCategoryList from "./pages/subCategory/SubCategoryList";
import Contact from "./pages/pages/Contact";
import About from "./pages/pages/About";
import AddWhyAwni from "./pages/pages/AddWhyAwni";
import WhyAwniList from "./pages/pages/WhyAwniList";
import EditWhyAwni from "./pages/pages/EditWhyAwni";
import AddExperienceCentre from "./pages/pages/AddExperienceCentre";
import ExperienceCentreList from "./pages/pages/ExperienceCentreList";
import EditExperienceCenter from "./pages/pages/EditExperienceCentre";
import RangeList from "./pages/ranges/RangeList";
import AddRange from "./pages/ranges/AddRange";
import EditRange from "./pages/ranges/EditRange";
import SliderList from "./pages/pages/SliderList";
import EditSlider from "./pages/pages/EditSlider";
import AddSlider from "./pages/pages/AddSlider";
import HomepageBannerList from "./pages/pages/HomepageBannerList";
import EditHomepageBanner from "./pages/pages/EditHomepageBanner";
import AddHomepageBanner from "./pages/pages/AddHomepageBanner";
import EnquiryList from "./pages/enquiries/EnquiryList";
import ViewEnquiry from "./pages/enquiries/ViewEnquiry";
import AddEnquiry from "./pages/enquiries/AddEnquiry";
import EditEnquiry from "./pages/enquiries/EditEnquiry";

// Franchisee
import FranchiseeList from "./pages/franchise/FranchiseeList";
import EditFranchisee from "./pages/franchise/EditFranchisee";
import ViewFranchisee from "./pages/franchise/ViewFranchisee";

import ChildCategoryList from "./pages/childCategory/ChildCategoryList";
import AddChildCategory from "./pages/childCategory/AddChildCategory";
import EditChildCategory from "./pages/childCategory/EditChildCategory";
import EditCustomer from "./pages/customers/EditCustomer";
import ViewCustomer from "./pages/customers/ViewCustomer";
import AddColorFromCSV from "./pages/colors/AddColorFromCSV";
import AddRangeFromCSV from "./pages/ranges/AddRangeFromCSV";
import AddParCatFromCSV from "./pages/parentCategory/AddParCatFromCSV";
import AddSubCatFromCSV from "./pages/subCategory/AddSubCatFromCSV";
import AddChildCatFromCSV from "./pages/childCategory/AddChildCatFromCSV";
import AddProductFromCSV from "./pages/products/AddProductFromCSV";
import EditRangeFromCSV from "./pages/ranges/EditRangeFromCSV";
import EditColorFromCSV from "./pages/colors/EditColorFromCSV";
import EditParCatFromCSV from "./pages/parentCategory/EditParCatFromCSV";
import EditSubCatFromCSV from "./pages/subCategory/EditSubCatFromCSV";
import EditChildCatFromCSV from "./pages/childCategory/EditChildCatFromCSV";
import EditProductFromCSV from "./pages/products/EditProductFomCSV";
import ForgotPassword from "./pages/ForgotPassword";
import EnterOtp from "./pages/EnterOtp";
import CreateNewPassword from "./pages/CreateNewPassword";
import NatureList from "./pages/natures/NatureList";
import AddNature from "./pages/natures/AddNature";
import EditNature from "./pages/natures/EditNature";
import SurfaceList from "./pages/surfaces/SurfaceList";
import AddSurface from "./pages/surfaces/AddSurface";
import EditSurface from "./pages/surfaces/EditSurface";
import SeriesList from "./pages/series/SeriesList";
import AddSeries from "./pages/series/AddSeries";
import EditSeries from "./pages/series/EditSeries";
import PatternList from "./pages/patterns/PatternList";
import AddPattern from "./pages/patterns/AddPattern";
import EditPattern from "./pages/patterns/EditPattern";

// Create Context
export const BranchContext = createContext();

// Create Context
const Routing = () => {
  const history = useHistory();
  // Branch Context
  const { state, dispatch } = useContext(BranchContext);
  useEffect(() => {
    const branch = JSON.parse(localStorage.getItem("branch"));
    if (branch) {
      dispatch({ type: "BRANCH", payload: branch });
      // history.push("/")
    } else {
      history.push("/awni-admin/login");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/awni-admin" component={Dashboard} />
      <Route exact path="/awni-admin/login" component={Login} />
      {/* Forget Password */}
      <Route
        exact
        path="/awni-admin/forget-password"
        component={ForgotPassword}
      />
      {/* Enter Otp */}
      <Route exact path="/awni-admin/enter-otp" component={EnterOtp} />
      {/* Create Password */}
      <Route
        exact
        path="/awni-admin/create-password"
        component={CreateNewPassword}
      />
      <Route exact path="/awni-admin/profile" component={Profile} />

      {/* Parent Category */}
      <Route
        exact
        path="/awni-admin/parentCategory"
        component={ParCategoryList}
      />
      <Route
        exact
        path="/awni-admin/parentCategory/add"
        component={AddParentCategory}
      />
      <Route
        exact
        path="/awni-admin/parentCategory/addFromCSV"
        component={AddParCatFromCSV}
      />

      <Route
        exact
        path="/awni-admin/parentCategory/editFromCSV"
        component={EditParCatFromCSV}
      />
      <Route
        exact
        path="/awni-admin/parentCategory/edit/:id"
        component={EditParCategory}
      />

      {/* Sub Category */}
      <Route exact path="/awni-admin/subCategory" component={SubCategoryList} />
      <Route
        exact
        path="/awni-admin/subCategory/add"
        component={AddSubCategory}
      />
      <Route
        exact
        path="/awni-admin/subCategory/addFromCSV"
        component={AddSubCatFromCSV}
      />

      <Route
        exact
        path="/awni-admin/subCategory/editFromCSV"
        component={EditSubCatFromCSV}
      />

      <Route
        exact
        path="/awni-admin/subCategory/edit/:id"
        component={EditSubCategory}
      />

      {/* Child Category */}
      <Route
        exact
        path="/awni-admin/childCategory"
        component={ChildCategoryList}
      />
      <Route
        exact
        path="/awni-admin/childCategory/add"
        component={AddChildCategory}
      />

      <Route
        exact
        path="/awni-admin/childCategory/addFromCSV"
        component={AddChildCatFromCSV}
      />
      <Route
        exact
        path="/awni-admin/childCategory/editFromCSV"
        component={EditChildCatFromCSV}
      />

      <Route
        exact
        path="/awni-admin/childCategory/edit/:id"
        component={EditChildCategory}
      />

      {/* Range */}
      <Route exact path="/awni-admin/ranges" component={RangeList} />
      <Route exact path="/awni-admin/range/add" component={AddRange} />
      <Route
        exact
        path="/awni-admin/range/addFromCSV"
        component={AddRangeFromCSV}
      />
      <Route
        exact
        path="/awni-admin/range/editFromCSV"
        component={EditRangeFromCSV}
      />
      <Route exact path="/awni-admin/range/edit/:id" component={EditRange} />

      {/* Products */}
      <Route exact path="/awni-admin/products" component={ProductList} />
      <Route exact path="/awni-admin/product/add" component={AddProduct} />
      <Route
        exact
        path="/awni-admin/product/addFromCSV"
        component={AddProductFromCSV}
      />

      <Route
        exact
        path="/awni-admin/product/editFromCSV"
        component={EditProductFromCSV}
      />

      <Route
        exact
        path="/awni-admin/product/edit/:id"
        component={EditProduct}
      />

      {/* Adon Products */}
      <Route
        exact
        path="/awni-admin/adonProducts"
        component={AdonProductList}
      />
      <Route
        exact
        path="/awni-admin/adonProduct/add"
        component={AddAdonProduct}
      />
      <Route
        exact
        path="/awni-admin/adonProduct/edit/:id"
        component={EditAdonProduct}
      />

      {/* Coupons */}
      <Route exact path="/awni-admin/coupons" component={CouponList} />
      <Route exact path="/awni-admin/coupon/add" component={AddCoupon} />
      <Route exact path="/awni-admin/coupon/edit/:id" component={EditCoupon} />

      {/* Pages */}
      <Route exact path="/awni-admin/contact" component={Contact} />
      <Route exact path="/awni-admin/about" component={About} />
      <Route exact path="/awni-admin/coupon/add" component={AddCoupon} />
      <Route exact path="/awni-admin/whyAwni/add" component={AddWhyAwni} />
      <Route exact path="/awni-admin/whyAwni" component={WhyAwniList} />
      <Route
        exact
        path="/awni-admin/whyAwni/edit/:id"
        component={EditWhyAwni}
      />
      <Route
        exact
        path="/awni-admin/experienceCentre"
        component={ExperienceCentreList}
      />
      <Route
        exact
        path="/awni-admin/experienceCentre/add"
        component={AddExperienceCentre}
      />
      <Route
        exact
        path="/awni-admin/experienceCentre/edit/:id"
        component={EditExperienceCenter}
      />
      <Route exact path="/awni-admin/sliders" component={SliderList} />
      <Route exact path="/awni-admin/slider/edit/:id" component={EditSlider} />
      <Route exact path="/awni-admin/slider/add" component={AddSlider} />
      <Route exact path="/awni-admin/banners" component={HomepageBannerList} />
      <Route
        exact
        path="/awni-admin/banner/edit/:id"
        component={EditHomepageBanner}
      />
      <Route
        exact
        path="/awni-admin/banner/add"
        component={AddHomepageBanner}
      />

      {/* Enquiry */}
      <Route exact path="/awni-admin/enquiries" component={EnquiryList} />
      <Route exact path="/awni-admin/enquiry/add" component={AddEnquiry} />
      <Route
        exact
        path="/awni-admin/enquiry/edit/:id"
        component={EditEnquiry}
      />
      <Route
        exact
        path="/awni-admin/enquiry/view/:id"
        component={ViewEnquiry}
      />

      {/* Franchisee */}
      <Route exact path="/awni-admin/franchisee" component={FranchiseeList} />
      <Route
        exact
        path="/awni-admin/franchisee/edit/:id"
        component={EditFranchisee}
      />
      <Route
        exact
        path="/awni-admin/franchisee/view/:id"
        component={ViewFranchisee}
      />

      {/* Deals */}
      <Route exact path="/awni-admin/deals" component={DealsList} />
      <Route exact path="/awni-admin/deals/add" component={AddDeals} />
      <Route exact path="/awni-admin/deals/edit/:id" component={EditDeals} />

      {/* Shipping Method */}
      <Route
        exact
        path="/awni-admin/shippingMethods"
        component={ShippingMethodList}
      />
      <Route
        exact
        path="/awni-admin/shippingMethod/add"
        component={AddShippingMethod}
      />
      <Route
        exact
        path="/awni-admin/shippingMethod/edit/:id"
        component={EditShippingMethod}
      />
      {/* Flavour */}
      <Route exact path="/awni-admin/flavours" component={FlavourList} />
      <Route exact path="/awni-admin/flavour/add" component={AddFlavour} />
      <Route
        exact
        path="/awni-admin/flavour/edit/:id"
        component={EditFlavour}
      />

      {/* Shape */}
      <Route exact path="/awni-admin/shapes" component={ShapeList} />
      <Route exact path="/awni-admin/shape/add" component={AddShape} />
      <Route exact path="/awni-admin/shape/edit/:id" component={EditShape} />

      {/* Pincode */}
      <Route exact path="/awni-admin/pincodes" component={PincodeList} />
      <Route exact path="/awni-admin/pincode/add" component={AddPincode} />
      <Route
        exact
        path="/awni-admin/pincode/edit/:id"
        component={EditPincode}
      />

      {/* Colors */}
      <Route exact path="/awni-admin/colors" component={ColorList} />
      <Route exact path="/awni-admin/color/add" component={AddColor} />
      <Route
        exact
        path="/awni-admin/color/addFromCSV"
        component={AddColorFromCSV}
      />
      <Route
        exact
        path="/awni-admin/color/editFromCSV"
        component={EditColorFromCSV}
      />
      <Route exact path="/awni-admin/color/edit/:id" component={EditColor} />

      {/* Natures */}
      <Route exact path="/awni-admin/natures" component={NatureList} />
      <Route exact path="/awni-admin/nature/add" component={AddNature} />
      <Route exact path="/awni-admin/nature/edit/:id" component={EditNature} />
      {/* <Route
        exact
        path="/awni-admin/nature/addFromCSV"
        component={AddColorFromCSV}
      /> */}
      {/* <Route
        exact
        path="/awni-admin/color/editFromCSV"
        component={EditColorFromCSV}
      /> */}

      {/* Surfaces */}
      <Route exact path="/awni-admin/surfaces" component={SurfaceList} />
      <Route exact path="/awni-admin/surface/add" component={AddSurface} />
      <Route
        exact
        path="/awni-admin/surface/edit/:id"
        component={EditSurface}
      />

      {/* Series */}
      <Route exact path="/awni-admin/series" component={SeriesList} />
      <Route exact path="/awni-admin/series/add" component={AddSeries} />
      <Route exact path="/awni-admin/series/edit/:id" component={EditSeries} />

      {/* Patterns */}
      <Route exact path="/awni-admin/patterns" component={PatternList} />
      <Route exact path="/awni-admin/pattern/add" component={AddPattern} />
      <Route
        exact
        path="/awni-admin/pattern/edit/:id"
        component={EditPattern}
      />

      {/* <Route
        exact
        path="/awni-admin/nature/addFromCSV"
        component={AddColorFromCSV}
      /> */}
      {/* <Route
        exact
        path="/awni-admin/color/editFromCSV"
        component={EditColorFromCSV}
      /> */}

      {/* Orders */}
      <Route exact path="/awni-admin/newOrders" component={NewOrders} />
      <Route exact path="/awni-admin/order/show/:id" component={ViewOrder} />
      <Route exact path="/awni-admin/orders" component={OrderList} />

      {/* Customer */}
      <Route exact path="/awni-admin/customers" component={CustomerList} />
      <Route
        exact
        path="/awni-admin/customer/edit/:id"
        component={EditCustomer}
      />
      <Route
        exact
        path="/awni-admin/customer/view/:id"
        component={ViewCustomer}
      />

      {/* Settings */}
      <Route exact path="/awni-admin/setting" component={Setting} />

      {/* Images */}
      <Route exact path="/awni-admin/slider" component={MainSlider} />
      <Route exact path="/awni-admin/nextToSlider" component={NextToSlider} />
      <Route
        exact
        path="/awni-admin/bestSaleBanner"
        component={DailyBestSaleBanner}
      />
      <Route
        exact
        path="/awni-admin/categoryPageBanner"
        component={CategoryPageBanner}
      />
      <Route exact path="/awni-admin/offerBanner" component={OfferBanner} />

      {/* Page Not Found */}
      <Route exact path="/*" component={PageNoteFound} />
    </Switch>
  );
};

const Branch = () => {
  const [state, dispatch] = useReducer(branchReducer, initialState);
  return (
    <div id="main-wrapper">
      <BranchContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router>
          <TopNavigation />
          <LeftNavigation />
          <Routing />
        </Router>
      </BranchContext.Provider>
    </div>
  );
};

export default Branch;
