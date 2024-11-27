import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAPI,
  fetchCategoriesAPI,
  fetchProductByCategoriesAPI,
} from "../store/reducers/productsReducer";
import {
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector,
  totalProductsSelector,
  productsPagesSelector,
  categoriesSelector,
  selectedCategoriesSelector,
} from "../store/selectors/productsSelector";
import FormateTable from "./core/TableFormate";
import { useInView } from "react-intersection-observer";
import {
  setLoading,
  setPagination,
  resetProduct,
  selectedCategories,
} from "../store/reducers/productsReducer";
import { useSearchParams } from "react-router-dom";
import Loading from "../Components/core/Loading";
import ButtonWithIcon from "./core/ButtonWithIcon";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const headerContent = [
    "Product Name",
    "Category",
    "Price",
    "Rating",
    "Stock",
  ];
  const headers = ["title", "category", "price", "rating", "stock"];

  const categoriesConfig = {
    beauty: { icon: "GiLipstick", color: "pink" },
    fragrances: { icon: "GiBrandyBottle", color: "#e8e829" },
    furniture: { icon: "GiBed", color: "#d08484" },
    groceries: { icon: "FaShoppingBag", color: "#9191cf" },
    "home-decoration": { icon: "FaHome", color: "#6fc26f" },
  };

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [resetProduct, setresetProduct] = useState(true);

  const products = useSelector(productsSelector);
  const totalProducts = useSelector(totalProductsSelector);
  const productsLoading = useSelector(productsLoadingSelector);
  const productsError = useSelector(productsErrorSelector);
  const pages = useSelector(productsPagesSelector);
  const categories = useSelector(categoriesSelector);
  const selectedCategory = useSelector(selectedCategoriesSelector);

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (
      resetProduct &&
      bottomInView &&
      !productsLoading &&
      pages.skip <= totalProducts
    ) {
      dispatch(setLoading(true));
      const timeoutId = setTimeout(() => {
        dispatch(fetchProductsAPI({ skip: pages.skip }));
        dispatch(setPagination(pages.skip));
        searchParams.set("skip", pages.skip);
        setSearchParams(searchParams);
        dispatch(setLoading(false));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [bottomInView]);

  useEffect(() => {
    dispatch(fetchCategoriesAPI());
  }, []);

  useEffect(() => {
    if (bottomInView && !productsLoading && pages.skip <= totalProducts) {
      dispatch(setLoading(true));
      const timeoutId = setTimeout(() => {
        dispatch(
          fetchProductByCategoriesAPI({
            skip: pages.skip,
            category: selectedCategories,
          })
        );
        dispatch(setPagination(pages.skip));
        searchParams.set("skip", pages.skip);
        setSearchParams(searchParams);
        dispatch(setLoading(false));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCategory]);

  const navigate = useNavigate();

  const reset = () => {
    dispatch(selectedCategories(null));
    navigate(`/products?limit=${pages.limit}&skip=0`);
    console.log("abv");
  };

  const clickOnCategories = (category) => {
    dispatch(selectedCategories(category));
    console.log(selectedCategory);
  };

  if (productsError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if (products) {
    return (
      <div className="overflow-y-scroll">
        <div className="w-full">
          <div className="flex items-center justify-center my-8 gap-4">
            <ButtonWithIcon
              config={{ icon: "RxCross1", color: "#e75454" }}
              item={{ name: "Reset" }}
              clickButton={() => reset()}
            />
            {categories.map((item, index) => (
              <ButtonWithIcon
                key={index}
                config={categoriesConfig[item?.slug]}
                item={item}
                clickButton={() => clickOnCategories(item?.slug)}
              />
            ))}
          </div>
          <FormateTable
            tableName="Product Page"
            headerContent={headerContent}
            headers={headers}
            state={products}
            click={false}
          />
          <div ref={bottomRef} className="h-12 my-5 text-center">
            {pages.skip >= totalProducts ? (
              "No More Products"
            ) : productsLoading ? (
              <Loading />
            ) : (
              "Load more..."
            )}

            {/* {pages.skip >= totalProducts ? "No More Products" : null}
            {productsLoading ? <Loading /> : null}
            {!productsLoading ? "Load more..." : null} */}
          </div>
        </div>
      </div>
    );
  }
};

export default Products;
