import React, { useEffect, useRef, useState } from "react";
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
  selectedCategorySelector,
} from "../store/selectors/productsSelector";
import FormateTable from "./core/TableFormat";
import { useInView } from "react-intersection-observer";
import {
  setLoading,
  setPagination,
  setSelectedCategory,
} from "../store/reducers/productsReducer";
import { useSearchParams } from "react-router-dom";
import Loading from "../Components/core/Loading";
import ButtonWithIcon from "./core/ButtonWithIcon";
import { useNavigate } from "react-router-dom";

const headerContent = ["Product Name", "Category", "Price", "Rating", "Stock"];
const headers = ["title", "category", "price", "rating", "stock"];

const categoriesConfig = {
  beauty: { icon: "GiLipstick", color: "pink" },
  fragrances: { icon: "GiBrandyBottle", color: "#e8e829" },
  furniture: { icon: "GiBed", color: "#d08484" },
  groceries: { icon: "FaShoppingBag", color: "#9191cf" },
  "home-decoration": { icon: "FaHome", color: "#6fc26f" },
};

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector(productsSelector);
  const totalProducts = useSelector(totalProductsSelector);
  const productsLoading = useSelector(productsLoadingSelector);
  const productsError = useSelector(productsErrorSelector);
  const pages = useSelector(productsPagesSelector);
  const categories = useSelector(categoriesSelector);
  const selectedCategory = useSelector(selectedCategorySelector);

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    dispatch(fetchCategoriesAPI());
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (selectedCategory && categoryParam !== selectedCategory) {
      searchParams.set("category", selectedCategory);
      setSearchParams(searchParams);
    }

    const shouldFetchByCategory =
      categoryParam && categoryParam !== "null" && pages.skip <= totalProducts;

    const shouldFetchProducts =
      bottomInView && pages.skip <= totalProducts && categoryParam === "null";

    if (shouldFetchByCategory || shouldFetchProducts) {
      dispatch(setLoading(true));

      const timeoutId = setTimeout(() => {
        if (shouldFetchByCategory) {
          dispatch(
            fetchProductByCategoriesAPI({
              skip: pages.skip,
              category: categoryParam,
              limit: pages.limit,
            })
          );
          if (bottomInView) {
            dispatch(setPagination(pages.skip));
          }
        } else if (shouldFetchProducts) {
          dispatch(fetchProductsAPI({ skip: pages.skip, limit: pages.limit }));
        }

        dispatch(setLoading(false));
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [bottomInView, selectedCategory, searchParams]);

  const navigate = useNavigate();

  const reset = () => {
    dispatch(setSelectedCategory(null));
    navigate(`/products?category=null`);
  };

  const clickOnCategories = (category) => {
    dispatch(setSelectedCategory(category));
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
                isActive={searchParams.get("category") === item?.slug}
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
            {!productsLoading && pages.skip >= totalProducts
              ? "No More Products"
              : null}
            {productsLoading ? <Loading /> : null}
            {!productsLoading && pages.skip < totalProducts
              ? "Load more..."
              : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Products;
