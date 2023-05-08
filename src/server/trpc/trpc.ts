import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/router/app";

export const trpc = createTRPCReact<AppRouter>();
