import { Link } from "react-router-dom";

type Props = {
  label: string;
};

export default function NavLinks({ label }: Props) {
  return (
    <li>
      <Link
        to={`/${label}`}
        className="text-couleurprincipale font-bold text-lg tracking-wide hover:bg-gray-100 rounded uppercase"
      >
        {label}
      </Link>
    </li>
  );
}
