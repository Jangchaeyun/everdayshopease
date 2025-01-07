import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import content from "../../data/content.json";
import Rating from "../../components/Rating/Rating";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductColors from "./ProductColors";
import { CartIcon } from "../../components/common/CartIcon";
import SvgCreditCard from "../../components/common/SvgCreditCard";
import SvgCloth from "../../components/common/SvgCloth";
import SvgShipping from "../../components/common/SizeShipping";
import SvgReturn from "../../components/common/SvgReturn";
import SectionHeading from "../../components/Sections/SectionHeading/SectionHeading";
import ProductCard from "../ProductListPage/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getAllProducts } from "../../api/fetchProducts";

// const categories = content?.categories;

const extraSections = [
  {
    icon: <SvgCreditCard />,
    label: "안전한 결제",
  },
  {
    icon: <SvgCloth />,
    label: "사이즈 및 핏",
  },
  {
    icon: <SvgShipping />,
    label: "배송비 무료",
  },
  {
    icon: <SvgReturn />,
    label: "무료 배송 및 반품",
  },
];

const ProductDetails = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState();
  const [breadcrumbLinks, setBreadcrumbLinks] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartState?.cart);
  const [similarProduct, setSimilarProducts] = useState([]);
  const categories = useSelector((state) => state?.categoryState?.categories);
  const [selectedSize, setSelectedSize] = useState("");

  const productCategory = useMemo(() => {
    return categories?.find((category) => category?.id === product?.categoryId);
  }, [product, categories]);

  useEffect(() => {
    getAllProducts(product?.categoryId, product?.categoryTypeId)
      .then((res) => {
        const excludedProduct = res?.filter((item) => item?.id !== product?.id);
        setSimilarProducts(excludedProduct);
      })
      .catch(() => {});
  }, [product?.categoryId, product?.categoryTypeId]);

  useEffect(() => {
    setImage(product?.thumbnail);
    setBreadcrumbLinks([]);
    const arrayLinks = [
      { title: "홈", path: "/" },
      {
        title: productCategory?.name,
        path: productCategory?.name,
      },
    ];
    const productType = productCategory?.categoryTypes?.find(
      (item) => item?.id === product?.categoryTypeId
    );

    if (productType) {
      arrayLinks?.push({
        title: productType?.name,
        path: productType?.name,
      });
    }
    setBreadcrumbLinks(arrayLinks);
  }, [productCategory, product, selectedSize]);

  const addItemToCart = useCallback(() => {
    // dispatch(addItemToCart({ id: product?.id, quantity: 1 }));
    // const selectedSize =
    console.log("size ", selectedSize);
  }, []);

  const colors = useMemo(() => {
    const colorSet = _.uniq(_.map(product?.variants, "color"));
    return colorSet;
  }, [product]);

  const sizes = useMemo(() => {
    const sizeSet = _.uniq(_.map(product?.variants, "size"));
    return sizeSet;
  }, [product]);

  return (
    <>
      <div className="flex flex-col md:flex-row p-10">
        <div className="w-[100%] lg:w-[50%]  md:w-[40%]">
          {/* Image */}
          <div className="flex flex-col md:flex-row">
            <div className="w-[100%] md:w-[20%] justify-center h-[40px] md:h-[420px]">
              {/* Stack images */}
              <div className="flex flex-row md:flex-col justify-center h-full">
                {product?.productResources?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(item?.url)}
                    className="rounded-lg w-fit p-2 mb-2"
                  >
                    <img
                      src={item?.url}
                      className="h-[60px] w-[60px] bg-center bg-cover hover:scale-105"
                      alt={"sample-" + index}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[80%] flex justify-center md:pt-0 pt-10">
              <img
                src={image}
                className="h-full w-full max-h-[620px] border rounded-lg cursor-pointer object-cover"
                alt={product?.name}
              />
            </div>
          </div>
        </div>
        <div className="w-[60%] px-10">
          {/* Product Description */}
          <Breadcrumb links={breadcrumbLinks} />
          <p className="text-3xl pt-4">{product?.name}</p>
          <Rating rating={product?.rating} />
          {/* Pricing Tag */}
          <p className="text-xl bold py-2">
            {product?.price.toLocaleString()}원
          </p>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <p className="text-sm bold">사이즈 선택</p>
              <Link
                className="text-sm text-gray-500 hover:text-gray-900"
                to={
                  "https://ko.wikipedia.org/wiki/%EC%98%B7_%ED%81%AC%EA%B8%B0"
                }
              >
                {"사이즈 가이드 ->"}
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <SizeFilter
              onChange={(values) => {
                setSelectedSize(values?.[0] ?? "");
              }}
              sizes={sizes}
              hidleTitle
              multi={true}
            />
          </div>
          <div>
            <p className="text-lg">가능한 색상</p>
            <ProductColors colors={colors} />
          </div>
          <div className="flex py-4">
            <button
              onClick={addItemToCart}
              className="bg-black rounded-lg hover:bg-gray-700"
            >
              <div className="flex h-[42px] rounded-lg w-[150px] px-2 items-center justify-center bg-black text-white hover:bg-gray-700">
                <svg
                  width="17"
                  height="16"
                  className=""
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 1.33325H2.00526C2.85578 1.33325 3.56986 1.97367 3.6621 2.81917L4.3379 9.014C4.43014 9.8595 5.14422 10.4999 5.99474 10.4999H13.205C13.9669 10.4999 14.6317 9.98332 14.82 9.2451L15.9699 4.73584C16.2387 3.68204 15.4425 2.65733 14.355 2.65733H4.5M4.52063 13.5207H5.14563M4.52063 14.1457H5.14563M13.6873 13.5207H14.3123M13.6873 14.1457H14.3123M5.66667 13.8333C5.66667 14.2935 5.29357 14.6666 4.83333 14.6666C4.3731 14.6666 4 14.2935 4 13.8333C4 13.373 4.3731 12.9999 4.83333 12.9999C5.29357 12.9999 5.66667 13.373 5.66667 13.8333ZM14.8333 13.8333C14.8333 14.2935 14.4602 14.6666 14 14.6666C13.5398 14.6666 13.1667 14.2935 13.1667 13.8333C13.1667 13.373 13.5398 12.9999 14 12.9999C14.4602 12.9999 14.8333 13.373 14.8333 13.8333Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                장바구니 담기
              </div>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {/*  */}
            {extraSections?.map((section) => (
              <div className="flex items-center">
                {section?.icon}
                <p className="px-2">{section?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Product Description */}
      <SectionHeading title={"제품 설명"} />
      <div className="md:w-[50%] w-full p-2">
        <p className="px-8">{product?.description}</p>
      </div>
      <SectionHeading title={"비슷한 제품"} />
      <div className="flex px-10">
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-8 px-2">
          {similarProduct?.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
          {!similarProduct?.length && <p>제품을 찾을 수 없습니다.</p>}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
