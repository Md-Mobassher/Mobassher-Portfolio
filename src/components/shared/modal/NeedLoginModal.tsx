"use client";

import { useRouter } from "next/navigation";
import { ReusableModal, ReusableModalProps } from "./ReusableModal";

const NeedLoginModal = ({ open, onClose, loading }: ReusableModalProps) => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="To use this feature, you need to login."
      description="To use this feature, you need to login. After login, you can use this feature."
      onConfirm={handleLogin}
      loading={loading}
      confirmText="Login"
      cancelText="Cancel"
    />
  );
};

export default NeedLoginModal;
