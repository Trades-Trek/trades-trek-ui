import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="site--footer">
      <p>© {currentYear} All Rights reserved.</p>
    </div>
  );
}