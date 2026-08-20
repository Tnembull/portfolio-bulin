import React from "react";

export default function JSONLDSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Nur Ashiddiqi",
    alternateName: ["Bulin", "Tnembull", "ashiddiqi"],
    jobTitle: "DevOps & System Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Newus Teknologi",
      url: "https://newus.id",
    },
    url: "https://bulindev.tech",
    sameAs: [
      "https://github.com/Tnembull",
      "https://github.com/ashiddiqi",
      "https://linkedin.com/in/muhammadnurashiddiqi",
    ],
    knowsAbout: [
      "DevOps",
      "Docker",
      "Kubernetes",
      "Linux",
      "CI/CD",
      "PostgreSQL",
      "Cloud Infrastructure",
      "Terraform",
      "System Architecture",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Muhammad Nur Ashiddiqi – DevOps Engineer Portfolio",
    url: "https://bulindev.tech",
    author: {
      "@type": "Person",
      name: "Muhammad Nur Ashiddiqi",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
