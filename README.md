# NFInsight Production Version

This is the production repository of NFInsight, an analytics tool that aims to push the limits of free tier architecture while providing quality analytics for NFTs and their portfolios.

## Tech Stack

Here's the tech stack that we use:

- Frontend: NextJS 13, TailwindCSS, TRPC, Tanstack Query, TypeScript
- Backend:
  - Webpage Server: NextJS API Routes
  - ETL: A Docker-Compose app running on Azure VMs, with:
    - FastAPI
    - Celery
    - RabbitMQ
    - Redis

- Database
  - NoSQL: Datastax Astra on Cassandra

- Infrastructure: To be hosted on Azure, with the following services, for now:

  - Azure Static Web Apps
  - Azure VM

  These will be provisioned with Terraform.

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

### Editor Setup with Prettier

If using VSCode, do set up the Prettier extension, and configure it as your default code formatter. Enable it on all typescript files, and **enable format on save/paste**.

You may also run `npm run lint` or `pnpm lint` to auto-format all your files before each commit.

---

## Conclusion

This is still in development. If you have any queries, do create an issue and tag us.

Co-Developed by [@SeeuSim](https://github.com/SeeuSim) and [@JamesLiuZX](https://github.com/JamesLiuZX)
