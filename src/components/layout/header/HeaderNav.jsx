import Container from "../Container";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function HeaderNav() {
  return (
    <div className="hidden border-t md:block">
      <Container>
        <nav className="flex h-14 items-center gap-10">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}