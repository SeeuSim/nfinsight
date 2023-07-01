'use client'
import { useQuery } from "@tanstack/react-query";

export default function MainPage() {
  const { data } = useQuery<{ message: string }>({
    queryKey: ["meta"],
    queryFn: async () => {
      return await fetch(`/api/meta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          route: "/",
          queries: {
            rank: "rank",
            duration: "duration",
          },
        }),
      }).then((res) => res.json());
    },
  });
  return <div></div>;
}
