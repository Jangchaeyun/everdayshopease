import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Navigation/Navigation.css";
import { CartIcon } from "../common/CartIcon";
import { AccountIcon } from "../common/AccountIcon";
import { Wishlist } from "../common/Wishlist";
const Navigation = () => {
  return (
    <nav className="flex items-center py-6 px-16 justify-between gap-40">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <a className="text-3xl font-bold text-black gap-8" href="/">
          EveryDayShopease
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-10 flex-1">
        {/* Nav items */}
        <ul className="flex gap-14 text-gray-600">
          <li className="text-gray-600 hover:text-black">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              홈
            </NavLink>
          </li>
          <li className="text-gray-600 hover:text-black">
            <NavLink
              to="/men"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              남성
            </NavLink>
          </li>
          <li className="text-gray-600 hover:text-black">
            <NavLink
              to="/women"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              여성
            </NavLink>
          </li>
          <li className="text-gray-600 hover:text-black">
            <NavLink
              to="/kid"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              키즈
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        {/* Search bar */}
        <div className="border rounded flex overflow-hidden">
          <div className="flex items-center justify-center px-4 border-l">
            <svg
              class="h-4 w-4 text-grey-dark"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              type="text"
              className="px-4 py-2 outline-none"
              placeholder="검색"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {/* Action Items - icons */}
        <ul className="flex gap-8">
          <li>
            <button>
              <Wishlist />
            </button>
          </li>
          <li>
            <button>
              <AccountIcon />
            </button>
          </li>
          <li>
            <Link to="/cart-items">
              <CartIcon />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
