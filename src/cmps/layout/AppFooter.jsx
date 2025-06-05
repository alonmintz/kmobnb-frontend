import { useEffect, useState } from "react";

export function AppFooter() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      const contentShort = document.body.offsetHeight <= window.innerHeight;
      setShow(bottomReached || contentShort);
    };

    check();
    window.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <>
      <div className="spacer"></div>
      <footer className={`app-footer full ${show ? "show" : ""}`}>
        <p>&copy; Kmobnb 2025, Inc.</p>
        {/* {import.meta.env.LOCAL ?
					<span className="local-services">Local Services</span> :
					<span className="remote-services">Remote Services</span>} */}
        <span>
          By <a href="https://github.com/alonmintz">@alonmintz</a> and{" "}
          <a href="https://github.com/keyal">@keyal</a>
        </span>
      </footer>
    </>
  );
}
