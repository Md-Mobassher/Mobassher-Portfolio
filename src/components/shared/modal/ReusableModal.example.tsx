import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReusableModal } from "./ReusableModal";

// Example component showing different modal usage patterns
export const ModalExamples = () => {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

  const openModal = (modalName: string) => {
    setOpenModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setOpenModals((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Modal Examples</h1>

      {/* Small Modal */}
      <div>
        <Button onClick={() => openModal("small")}>Open Small Modal</Button>
        <ReusableModal
          open={openModals.small}
          size="sm"
          title="Small Modal"
          description="This is a small modal for simple confirmations"
          onClose={() => closeModal("small")}
          onConfirm={() => {
            console.log("Small modal confirmed");
            closeModal("small");
          }}
        />
      </div>

      {/* Medium Modal (Default) */}
      <div>
        <Button onClick={() => openModal("medium")}>Open Medium Modal</Button>
        <ReusableModal
          open={openModals.medium}
          title="Medium Modal"
          description="This is the default medium-sized modal"
          onClose={() => closeModal("medium")}
          onConfirm={() => {
            console.log("Medium modal confirmed");
            closeModal("medium");
          }}
        />
      </div>

      {/* Large Modal */}
      <div>
        <Button onClick={() => openModal("large")}>Open Large Modal</Button>
        <ReusableModal
          open={openModals.large}
          size="lg"
          title="Large Modal"
          description="This is a large modal for more content"
          onClose={() => closeModal("large")}
          onConfirm={() => {
            console.log("Large modal confirmed");
            closeModal("large");
          }}
        >
          <div className="space-y-4">
            <p>This modal contains additional content in the body.</p>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold">Content Section</h3>
              <p>You can put any React components here.</p>
            </div>
          </div>
        </ReusableModal>
      </div>

      {/* Extra Large Modal */}
      <div>
        <Button onClick={() => openModal("xl")}>Open XL Modal</Button>
        <ReusableModal
          open={openModals.xl}
          size="xl"
          title="Extra Large Modal"
          description="Perfect for forms and complex content"
          onClose={() => closeModal("xl")}
          onConfirm={() => {
            console.log("XL modal confirmed");
            closeModal("xl");
          }}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-medium">Left Column</h4>
                <p>Content in the left column</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-medium">Right Column</h4>
                <p>Content in the right column</p>
              </div>
            </div>
          </div>
        </ReusableModal>
      </div>

      {/* Custom Width Modal */}
      <div>
        <Button onClick={() => openModal("custom")}>
          Open Custom Width Modal
        </Button>
        <ReusableModal
          open={openModals.custom}
          size="custom"
          customWidth="800px"
          title="Custom Width Modal"
          description="This modal has a custom width of 800px"
          onClose={() => closeModal("custom")}
          onConfirm={() => {
            console.log("Custom modal confirmed");
            closeModal("custom");
          }}
        >
          <div className="bg-yellow-50 p-4 rounded">
            <p>This modal uses a custom width instead of predefined sizes.</p>
          </div>
        </ReusableModal>
      </div>

      {/* Full Screen Modal */}
      <div>
        <Button onClick={() => openModal("full")}>
          Open Full Screen Modal
        </Button>
        <ReusableModal
          open={openModals.full}
          size="full"
          title="Full Screen Modal"
          description="This modal takes up most of the screen"
          onClose={() => closeModal("full")}
          onConfirm={() => {
            console.log("Full screen modal confirmed");
            closeModal("full");
          }}
          maxHeight="90vh"
        >
          <div className="space-y-4">
            <div className="bg-gray-100 p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">
                Full Screen Content
              </h3>
              <p>
                This modal is perfect for complex forms, dashboards, or detailed
                views.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded border">
                  <h4 className="font-medium">Card {i + 1}</h4>
                  <p>Content for card {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </ReusableModal>
      </div>

      {/* Modal with Custom Behavior */}
      <div>
        <Button onClick={() => openModal("customBehavior")}>
          Open Modal with Custom Behavior
        </Button>
        <ReusableModal
          open={openModals.customBehavior}
          size="lg"
          title="Custom Behavior Modal"
          description="This modal has custom close behavior"
          onClose={() => closeModal("customBehavior")}
          onConfirm={() => {
            console.log("Custom behavior modal confirmed");
            closeModal("customBehavior");
          }}
          closeOnOverlayClick={false}
          closeOnEscape={false}
          centered={true}
          scrollable={true}
          maxHeight="70vh"
        >
          <div className="space-y-4">
            <p>
              This modal cannot be closed by clicking outside or pressing
              Escape.
            </p>
            <p>You must use the buttons to close it.</p>
          </div>
        </ReusableModal>
      </div>

      {/* Modal without Footer */}
      <div>
        <Button onClick={() => openModal("noFooter")}>
          Open Modal without Footer
        </Button>
        <ReusableModal
          open={openModals.noFooter}
          size="md"
          title="No Footer Modal"
          description="This modal has no footer buttons"
          onClose={() => closeModal("noFooter")}
          hideFooter={true}
        >
          <div className="text-center py-4">
            <p>This modal has no footer buttons.</p>
            <p>You can only close it using the X button.</p>
          </div>
        </ReusableModal>
      </div>
    </div>
  );
};

export default ModalExamples;
