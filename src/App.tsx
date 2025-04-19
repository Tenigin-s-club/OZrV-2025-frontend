import "react-toastify/dist/ReactToastify.css";
import { ChatBot } from "./pages/Chat/Chat";
import { Dialog, DialogContent } from "./components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./components/ui/button";
import ModalsContainer from "./modules/ModalsContainer/ModalsContainer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="fixed shadow-2xl size-16 p-3 z-[1000] bottom-10 right-10 ">
            <img className="size-10 object-contain" src="/logo_fun.PNG" />
          </Button>
        </DialogTrigger>
        <DialogContent className="f-full w-full">
          <ChatBot />
        </DialogContent>
      </Dialog>
      <ToastContainer bodyClassName={"z-[10000000] relative"} />
      <ModalsContainer />
    </>
  );
}

export default App;
