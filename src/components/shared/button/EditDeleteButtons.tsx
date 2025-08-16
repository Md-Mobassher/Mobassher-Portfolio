import { Edit, Eye, Trash2 } from "lucide-react";

interface EditDeleteButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="flex md:gap-3 gap-2 justify-center">
      {onView && (
        <button
          className="text-blue-400 hover:text-blue-700 bg-white cursor-pointer"
          onClick={onView}
        >
          <Eye className="size-5" />
        </button>
      )}
      {onEdit && (
        <button
          className="text-primary hover:text-accent bg-white cursor-pointer"
          onClick={onEdit}
        >
          <Edit className="size-5" />
        </button>
      )}
      {onDelete && (
        <button
          className="text-red-600 hover:text-red-800 cursor-pointer"
          onClick={onDelete}
        >
          <Trash2 className="size-5" />
        </button>
      )}
    </div>
  );
};

export default EditDeleteButtons;
