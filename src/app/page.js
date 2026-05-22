import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import SuccessStories from "@/components/SuccessStories";
import Tips from "@/components/Tips";


export default function Home() {
  return (
    <div>
      <Banner/>
      <Featured/>
      <SuccessStories/>
      <Tips/>
    </div>
  );
}
