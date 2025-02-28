import HomeIntro from "../../components/HomeIntro";
import HomeAbout from "../../components/HomeAbout";
import HomeWhy from "../../components/HomeWhy";
import HomeMaterial from "../../components/HomeMaterial";
import HomeFeedback from "../../components/HomeFeedback";
import HomeProduct from "../../components/HomeProducts";

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <HomeAbout />
      <HomeWhy />
      <HomeMaterial />
      <HomeFeedback />
      <HomeProduct />
    </>
  );
}
