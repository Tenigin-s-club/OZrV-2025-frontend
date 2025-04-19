import { uiSelectors } from "@/store/ui";
import { useSelector } from "react-redux";

const EventModal = () => {
  const event = useSelector(uiSelectors.getCurrentEvent);
  if (!event) return;
  return (
    <div className="p-4">
      <img
        src={event.image_url}
        className="w-full aspect-[9/16] mb-3 object-cover"
        alt="Фото к мероприятию"
      />
      <div className="flex w-full mb-3 justify-between items-center">
        <h3>{event.title}</h3>
        <span>{new Date(event.date_event).getUTCDate()}</span>
      </div>
      <p className="text-sm">{event.description}</p>
    </div>
  );
};

export default EventModal;
