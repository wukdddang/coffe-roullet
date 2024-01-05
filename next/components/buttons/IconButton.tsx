import { useRouter } from "next/navigation";

type Props = {
  icon: React.ReactNode;
  text: string;
  type: "button" | "submit" | "reset";
  className?: string;
  action?: "spin" | "choose" | "practice";
  onClick?: () => void;
};

const IconButton = ({
  icon,
  text,
  type,
  className,
  action,
  onClick,
}: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (action === "spin" && onClick) {
      onClick();
    } else {
      router.push(`/${action}`);
    }
  };

  return (
    <button
      type={type}
      className={`${className} tw-shadow-xl`}
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default IconButton;
