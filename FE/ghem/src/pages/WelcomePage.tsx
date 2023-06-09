import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Routes, Route } from "react-router";
import CategoryPage from "./CategoryPage";
import ChoiceGamePage from "./ChoiceGamePage";
import WelcomeContainer from "@components/welcome/WelcomeContainer";
import RecommendLoading from "@components/recommend/RecommendLoading";
import NotFound404Page from "./NotFound404Page";

function WelcomePage() {

  return (
    <div >
      <Routes>
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/choicegame" element={<ChoiceGamePage />} />
        <Route path="/recommendloading" element={<RecommendLoading />} />
        <Route path="/" element={<WelcomeContainer />} />
        <Route path="*" element={<NotFound404Page />} />
      </Routes> 
    </div>
  );
}


export default WelcomePage;
