import React, { useEffect } from "react";
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
import { searchParams } from "../constants/searchParams";

const headerContent = ["Product Name", "Category", "Price", "Rating", "Stock"];
const headers = ["title", "category", "price", "rating", "stock"];

const categoriesConfig = {
  beauty: { icon: "GiLipstick", color: "bg-pink-400" },
  fragrances: { icon: "GiBrandyBottle", color: "bg-amber-400" },
  furniture: { icon: "GiBed", color: "bg-orange-400" },
  groceries: { icon: "FaShoppingBag", color: "bg-violet-500" },
  "home-decoration": { icon: "FaHome", color: "bg-lime-500" },
};

const Products = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
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

  const categoryParam = searchParam.get(searchParams.CATEGORY);

  useEffect(() => {
    if (selectedCategory && categoryParam !== selectedCategory) {
      searchParam.set(searchParams.CATEGORY, selectedCategory);
      setSearchParam(searchParam);
    }

    const shouldFetchByCategory = categoryParam && pages.skip <= totalProducts;

    const shouldFetchProducts =
      !categoryParam && bottomInView && pages.skip <= totalProducts;

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
        } else if (shouldFetchProducts) {
          dispatch(fetchProductsAPI({ skip: pages.skip, limit: pages.limit }));
        }
        if (bottomInView) {
          dispatch(setPagination(pages.skip));
        }
        dispatch(setLoading(false));
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [bottomInView, selectedCategory, categoryParam]);

  const navigate = useNavigate();

  const reset = () => {
    dispatch(setSelectedCategory(null));
    searchParam.set(searchParams.CATEGORY, selectedCategory);
    navigate(`/products`);
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
              config={{ icon: "RxCross1", color: "bg-red-600" }}
              item={{ name: "Reset" }}
              clickButton={() => reset()}
            />
            {categories.map((item, index) => (
              <ButtonWithIcon
                key={index}
                config={categoriesConfig[item?.slug]}
                item={item}
                isActive={categoryParam === item?.slug}
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
