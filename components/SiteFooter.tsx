"use client";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>© {year} Ahmer Mairaj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
