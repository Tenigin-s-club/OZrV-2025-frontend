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
          <Button className="fixed z-[1000] bottom-10 right-10 ">
            ОТКРЫТЬ ЧАТ
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
