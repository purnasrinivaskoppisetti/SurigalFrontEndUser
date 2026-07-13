import clsx from "clsx";

export default function Container({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8 xl:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}