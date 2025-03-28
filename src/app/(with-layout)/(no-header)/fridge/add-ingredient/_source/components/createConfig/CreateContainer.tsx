import CreateIngredientList from "./CreateIngredientList";
import Header from "./Header";
import { Navigation } from "@/components/navigation";

interface Props {
  handleClose: () => void;
}

const CreateContainer = ({ handleClose }: Props) => {
  return (
    <div className="bg-foundation-tertiary z-30 min-h-screen">
      <Header handleClose={handleClose} />
      <div className="px-4 pb-20">
        <CreateIngredientList />
      </div>
      <Navigation />
    </div>
  );
};

export default CreateContainer;
