import { Link } from "react-router-dom";

type Props = {
  label: string;
  path?: string;
};

export default function NavLinks({ label, path }: Props) {
  return (
    <li>
      <Link
        to={`/${path ? path : label}`}
        className="text-couleurprincipale font-bold text-lg tracking-wide hover:bg-gray-100 rounded uppercase"
      >
        {label}
      </Link>
    </li>
  );
}
