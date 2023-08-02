import React from "react";
import Layout from "../../Layout/Layout";
import FirstAnnouncement from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

const LandingPage = () => {
    return (
        <Layout>
          <FirstAnnouncement />
          <SecondSection />
          <ThirdSection />
        </Layout>
    );
};

export default LandingPage;
