import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { appRoutersConfig } from "./lib/config/RouteConfig/RouteConfig";
import { Suspense } from "react";
import Loader from "./components/shared/Loader/Loader";
import { ChatBot } from "./pages/Chat/Chat";
import { Dialog, DialogContent } from "./components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./components/ui/button";

function App() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="fixed z-[1000] bottom-10 right-10 ">
          ОТКРЫТЬ ЧАТ
        </Button>
      </DialogTrigger>
      <DialogContent className="f-full w-full">
        <ChatBot />
      </DialogContent>
    </Dialog>

    // <Suspense
    //   fallback={
    //     <div className="w-screen h-screen flex justify-center items-center">
    //       <Loader />
    //     </div>
    //   }
    // >
    //   <ToastContainer />
    //   <RouterProvider router={appRoutersConfig} />
    // </Suspense>
  );
}

export default App;
