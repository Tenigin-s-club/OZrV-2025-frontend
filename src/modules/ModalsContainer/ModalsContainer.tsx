import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { uiActions, uiSelectors } from "@/store/ui";
import { useSelector } from "react-redux";
import EventModal from "../EventModal/EventModal";

const ModalsContainer = () => {
  const modalOpened = useSelector(uiSelectors.getModalOpened);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={!!modalOpened}
      onOpenChange={(n) => {
        if (!n) dispatch(uiActions.closeModal());
      }}
    >
      <DialogOverlay />
      <DialogContent>
        {modalOpened === "login" && <LoginForm />}
        {modalOpened === "register" && <RegisterForm />}
        {modalOpened === "event" && <EventModal />}
      </DialogContent>
    </Dialog>
  );
};

export default ModalsContainer;
