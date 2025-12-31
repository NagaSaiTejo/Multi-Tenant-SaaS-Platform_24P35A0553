## Multi-Tenant SaaS Platform

A production-grade Multi-Tenant SaaS system built with React, Node.js, PostgreSQL, JWT, and Docker.
This platform allows multiple organizations (tenants) to securely share one application while keeping their data, users, and limits fully isolated.

=> What This Project Is:

This is a role-based, subscription-aware SaaS platform where:
  Multiple companies (tenants) can use the same system
  Each tenant has isolated data
  Each user has role-based access
  Each tenant has plan-based limits
  A live dashboard shows real usage.

=> User Roles:
  Role	Access
  Super Admin	Manage all tenants
  Tenant Admin	Manage users & projects for their company
  User	Work only inside their organization

=> Key Features:
  Multi-tenant data isolation
  JWT authentication
  Role-based authorization
  Subscription limits (projects & users)
  Real-time dashboard
  Audit logging
  Dockerized deployment
  Clean SaaS UI

=> Folder Structure:
  Multi-Tenant-SaaS/
  │
  ├── backend/
  │   ├── src/
  │   │   ├── controllers/
  │   │   ├── routes/
  │   │   ├── middleware/
  │   │   ├── config/
  │   │   └── utils/
  │   └── migrations/
  │
  ├── frontend/
  │   ├── src/
  │   │   ├── pages/
  │   │   ├── layouts/
  │   │   ├── components/
  │   │   └── api/
  │
  ├── docker-compose.yml
  └── README.md

=> Architecture:
  React Frontend (Nginx)
          ↓
  Node.js API (JWT secured)
          ↓
  PostgreSQL (Multi-tenant DB)


Every API request is:
  Authenticated
  Tenant-scoped
  Role-validated

=>How can you run this project:

  Make sure Docker is installed in your computer,

  docker compose up -d

  Open in browser:
  http://localhost:3000

=> Demo Accounts
  Role	Email	Password
  Super Admin	superadmin@system.com
    Admin@123
  Tenant Admin	admin@demo.com
    Demo@123
  User	user1@demo.com
    User@123

  Tenant: demo

=> What This Project Proves:

This project shows:

  Real SaaS architecture
  Multi-tenant backends
  Secure authentication systems
  Role-based access control
  Dockerized production systems
  Professional dashboards.

=> Built By:

Naga Sai Satyanarayana Murthy Tejomurthula
B.Tech CSE | Full-Stack Developern Web/Flutter.