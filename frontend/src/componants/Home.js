import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1 className="logo">FlexFuels</h1>
                <p className="tagline">...a one stop solution for optimum nutrition</p>
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <button className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <div className="header-right">
                    <i className="fa fa-shopping-bag"></i>
                    <button className="login-signup-button">Login/Sign Up</button>
                </div>
            </header>

            <div className="poster">Poster</div>

            <div className="categories-section">
                <button className="category-button">Best Seller</button>
                <button className="category-button">Categories</button>
            </div>

            <section className="shop-by-level">
                <h2>Shop by Level</h2>
                <div className="level-buttons">
                    <button className="level-button">Beginner</button>
                    <button className="level-button">Intermediate</button>
                    <button className="level-button">Advanced</button>
                </div>
            </section>

            <section className="shop-by-brand">
                <h2>Shop by Brand</h2>
                <div className="brand-buttons">
                    <button className="brand-button">#Brand1</button>
                    <button className="brand-button">#Brand2</button>
                    <button className="brand-button">#Brand3</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
