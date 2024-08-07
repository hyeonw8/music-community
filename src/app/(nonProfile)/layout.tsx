import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PropsWithChildren } from "react";
import NavigationBar from "../../components/NavigationBar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="h-screen grid place-items-center">
        <div className="grid place-items-center flex-1 bg-[#D9D9D9] rounded-3xl w-[1280px] relative shadow-xl">
          <Header />
          <NavigationBar />
          <section className="w-full h-[800px] grid px-10 pb-10">
            <div className="w-full bg-white p-[20px] rounded-xl overflow-y-scroll scrollbar-hide z-10">{children}</div>
          </section>
        </div>
        <div className="grid place-items-end">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
