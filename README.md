# NFInsight Production Version

This is the production repository of NFInsight, an analytics tool that aims to push the limits of free tier architecture while providing quality analytics for NFTs and their portfolios.

## Tech Stack

Here's the tech stack that we use:

- Frontend: NextJS 13, TailwindCSS, TRPC, RTK, TypeScript
- Backend:
  - Serverless: NextJS 13 API Routes, TRPC, Zod
  - Monolith: TBD, but we are looking at hosting an Azure Container with one of the following, for batch jobs/analytics/ETL:

    - ExpressJS
    - Rocket (Rust)
    - FastAPI

- Database: We are currently in the midst of exploring if our workload can be shifted from PostgreSQL to Cassandra.
  - NoSQL: Azure Cosmos, with Cassandra (Free forever)
  - RDBMS: Azure SQL for Postgres

- Infrastructure: To be hosted on Azure, with the following services, for now:

  - Azure Static Web Apps
  - Azure Cosmos DB
  - Azure Containers

  These will be provisioned with Terraform.

When the base site and ETL infrastructure is up, we will then explore if the Analytics pipeline may be triggered by Azure Funtions or shifted to AzureML.

## Development Practices

### Directory Structure

As of now, here's our directory structure:

```sh
── src
│   ├── app
│   │   ├── api
│   │   │   └── ...
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── ...
│   ├── infrastructure
│   │   └── *.tf
│   └── server
│       └── ...
```

### What code goes where?

Here's how we organise our code:

- `src` - Hosts all the source code files for the project. Any other configuration files, like those needed for npm, typescript, or nextjs will live at the same level as this directory.

- `app` - Hosts all the route code for this app
  - Normal UI routes
  - `api` - Hosts all the server API routes this app uses

- `components` - Hosts all the UI component code for this app. Any HOCs to wrap the app code goes here as well.

- `server` - Any database, RPC or other server logic for the serverless backend lives here. As serverless architecture is not built for sustained load, any sustained operations longer than 5 seconds in length should not live here, but inside a dedicated server.

- `infrastructure` - Where the Terraform files that provision our infrastructure go.

### NextJS 13.4 Code Colocation

In NextJS 13.4, components are React Server Components by default. Unless explicitly specified with "use client", the code will run on the server.

Thus, you may directly query the backend within your component code. If doing so, please adhere to security principles, and also consider if client interactivity is needed with the page. If so, a client component would be more desirable.

### Naming conventions

You may refer to the NextJS 13 app directory documentation to learn more about file naming conventions within the `app` directory.

---

## Conclusion

This is still in development. If you have any queries, do create an issue and tag us.

Co-Developed by @SeeuSim and @JamesLiuZX

---

## Initial stuff

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
