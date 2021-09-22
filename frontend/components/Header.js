import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      <p>I'm the header</p>
      <div className="bar">
        <Link href="/">Sick fits</Link>
      </div>
      <div className="sub-bar">
        <p>Sick fits</p>
      </div>
      <Nav />
    </header>
  );
}
