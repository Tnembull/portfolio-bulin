export interface Project {
  id: string;
  slug?: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  tech?: string[];
  tags?: string[];
  image: string;
  year?: string;
  client?: string;
  role?: string;
  url?: string;
  link?: string;
  featured?: boolean;
  challenges?: string[];
  solutions?: string[];
  impact?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    "id": "proj-1788366502488",
    "link": "https://github.com/Tnembull/enterprise-backup-system",
    "role": "DevOps Engineer",
    "slug": "enterprise-backup-system",
    "tech": [
      "Bash",
      "Linux",
      "Disaster Recovery",
      "DevOps",
      "Rclone",
      "CloudPanel",
      "Backup",
      "Ubuntu"
    ],
    "year": "2026",
    "image": "https://media.bulindev.tech/uploads/1788367633519-EBS_opt.webp",
    "title": "Enterprise Backup System",
    "client": "Personal Project",
    "impact": [
      "Automated backup coverage across websites, databases, server configurations, Docker environments, PM2 processes, and SSL/TLS certificates.",
      "Enabled scheduled daily backups through cron, reducing the need for manual backup execution.",
      "Improved backup integrity assurance through SHA256 checksum generation and verification.",
      "Enabled remote backup synchronization to Google Drive with configurable 30-day remote retention.",
      "Provided both interactive and command-line restore workflows for multiple infrastructure components."
    ],
    "liveUrl": "",
    "category": "DevOps & Infrastructure",
    "githubUrl": "",
    "solutions": [
      "Built modular Bash scripts for websites, databases, Nginx, CloudPanel, Docker, PM2, and SSL/TLS components, allowing each backup operation to be managed independently.",
      "Implemented flock-based process locking, strict Bash error handling, structured logging, and SHA256 checksum verification to improve backup reliability and integrity.",
      "Added gzip/pigz compression, optional GPG encryption, configurable retention policies, and rclone-based synchronization to Google Drive for remote backup storage.",
      "Developed a dedicated restore engine with interactive and CLI modes for recovering databases, websites, Nginx, SSL, Docker, and CloudPanel data."
    ],
    "challenges": [
      "Backing up different application stacks and infrastructure components requires handling multiple file structures, databases, and service configurations.",
      "Backup processes must protect data integrity while avoiding duplicate or conflicting backup operations.",
      "Large backup archives need to be compressed, transferred to remote storage, and verified without making the process difficult to maintain.",
      "A backup system is only useful if the stored data can be reliably restored when needed."
    ],
    "description": "A modular Bash-based backup and restore system for automating VPS data protection, database backups, server configuration backups, and remote storage synchronization.",
    "longDescription": "Enterprise Backup System is a modular Bash-based backup and restore toolkit designed for production VPS environments running Ubuntu Server 24.04 LTS.\n\nThe system automates backups for websites, databases, server configurations, Docker environments, PM2 processes, and SSL/TLS certificates. It supports MySQL, MariaDB, and PostgreSQL databases and can automatically discover supported application and infrastructure components.\n\nTo improve backup reliability, the system includes compressed archives, optional GPG encryption, SHA256 integrity verification, configurable retention policies, process locking, structured logging, and automated synchronization to Google Drive using rclone.\n\nThe project also includes a dedicated restore engine that supports both interactive and command-line recovery for databases, websites, Nginx, SSL certificates, Docker, and CloudPanel environments.\n"
  },
  {
    "id": "proj-1788365366634",
    "link": "https://github.com/Tnembull/InfraShield",
    "role": "DevOps Engineer",
    "slug": "infrashield",
    "tech": [
      "Bash",
      "Linux",
      "Ubuntu",
      "Security Hardening",
      "Prometheus",
      "Docker",
      "Grafana",
      "Loki",
      "UFW",
      "Fail2ban",
      "Nginx"
    ],
    "year": "2026",
    "image": "https://media.bulindev.tech/uploads/1788365484708-Infrashield_opt.webp",
    "title": "InfraShield",
    "client": "Personal Project",
    "impact": [
      "Automated the provisioning and hardening of Ubuntu 24.04 LTS VPS environments through a single modular framework.",
      "Standardized security configuration across multiple infrastructure components, including SSH, UFW, Fail2ban, Auditd, Docker, and Nginx.",
      "Reduced the risk of configuration loss by introducing automatic backups and transactional rollback capabilities.",
      "Improved infrastructure visibility through integrated monitoring, logging, auditing, and security scanning tools.",
      "Enabled both interactive and non-interactive provisioning workflows for manual administration and automated deployment environments."
    ],
    "liveUrl": "",
    "category": "DevSecOps & Infrastructure",
    "githubUrl": "",
    "solutions": [
      "Built a modular automation framework that standardizes server provisioning and security configuration into repeatable installation modules.",
      "Implemented configuration backups and a rollback mechanism to restore previous configurations when a module fails.",
      "Added dry-run and non-interactive execution modes to support safer testing and automated provisioning workflows.",
      "Integrated monitoring, audit logging, security scanning, and log management into the provisioning workflow to improve infrastructure visibility and maintenance."
    ],
    "challenges": [
      "Manually provisioning and securing a fresh VPS requires many repetitive configuration steps and can lead to inconsistent server baselines.",
      "Applying system-level security changes can introduce configuration errors or unexpected service failures.",
      "Infrastructure changes need to be validated before being applied to production systems.",
      "Security and infrastructure health require continuous visibility after the initial server setup."
    ],
    "description": "An enterprise-grade Bash automation framework for provisioning, security hardening, monitoring, and maintaining Ubuntu 24.04 LTS VPS environments.",
    "longDescription": "InfraShield is a modular DevSecOps framework designed to automate the provisioning, security hardening, monitoring, and maintenance of Ubuntu 24.04 LTS servers. The project was built to reduce repetitive manual configuration and provide a more consistent baseline when preparing VPS environments for production workloads.\n\nThe framework uses a modular architecture, allowing individual components to be executed independently or as part of a complete provisioning workflow. It includes system hardening, firewall configuration, SSH security, intrusion prevention, audit logging, malware scanning, web server hardening, SSL automation, Docker security, backup automation, security scanning, monitoring, and automated security updates.\n\nInfraShield also includes validation, configuration backups, dry-run execution, non-interactive automation, progress reporting, audit logs, and rollback mechanisms to make infrastructure changes safer and easier to manage."
  },
  {
    "id": "1788356514000",
    "link": "https://github.com/Tnembull/ndeploy",
    "role": "DevOps Engineer",
    "slug": "ndeploy",
    "tech": [
      "GitHub Actions",
      "CI/CD",
      "Deployment",
      "Linux",
      "Automation"
    ],
    "year": "2026",
    "image": "https://media.bulindev.tech/uploads/1788356863530-ndeploy_opt.webp",
    "title": "nDeploy",
    "client": "Personal Project",
    "impact": [
      "Reduced repetitive manual tasks involved in application deployment.",
      "Improved deployment consistency by using a standardized and repeatable workflow.",
      "Made deployment progress and failures easier to identify during troubleshooting.",
      "Created a reusable deployment workflow that can be adapted for different application environments."
    ],
    "category": "DevOps & Automation",
    "solutions": [
      "Designed an automated deployment workflow to standardize the deployment process and reduce unnecessary manual intervention.",
      "Structured the deployment workflow into repeatable steps so application releases can follow a consistent process from source code to server.",
      "Added structured deployment steps and logging to make deployment progress easier to inspect and troubleshoot when an error occurs."
    ],
    "challenges": [
      "Reducing repetitive manual steps during application deployment.",
      "Maintaining a consistent deployment process across different environments.",
      "Handling deployment failures and making troubleshooting easier."
    ],
    "description": "A lightweight deployment automation tool designed to simplify application deployment, reduce manual server tasks, and provide a consistent and repeatable deployment workflow.",
    "longDescription": "nDeploy is a personal DevOps project focused on simplifying the application deployment process. The project was built to reduce repetitive manual tasks when deploying applications to servers and to provide a more structured and consistent deployment workflow.\n\nThe project focuses on deployment automation, server-side workflows, and repeatable application delivery. It reflects my interest in improving the development-to-production process by reducing manual intervention and making deployments easier to manage and maintain.\n\nThrough nDeploy, I explored practical DevOps concepts such as deployment automation, CI/CD workflows, Linux server environments, and application delivery."
  }
];
