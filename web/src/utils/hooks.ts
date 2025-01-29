import "@total-typescript/ts-reset";
import { extractErrorMessage } from "./security";
import { useEffect, useState } from "react";

export type Role = "USER" | "ADMIN";
export type Position = "gk" | "def" | "mf" | "fw";

export type User = {
  id: number;
  email: string;
  username: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

function usersChecking(data: unknown): data is User[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "id" in item &&
        "email" in item &&
        "username" in item &&
        "role" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    )
  );
}

export function useGetUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      fetch("http://localhost:3333/api/users", {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            return { message: `Erreur : ${res.status}` };
          }
          return res.json();
        })
        .then((data) => {
          if (!usersChecking(data)) {
            return { message: "Format de donnée invalide" };
          }
          setUsers(data);
        })
        .catch((error) => {
          return {
            message: extractErrorMessage(error),
          };
        })
        .finally(() => setLoading(false));
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return { users, loading };
}

export type UserWithPost = {
  user_id: number;
  username: string;
  email: string;
  role: Role;
  users_created_at: string;
  users_updated_at: string;
  post_id: number;
  title: string;
  content: string;
  posts_created_at: string;
  posts_updated_at: string;
};

function userWithPostsChecking(data: unknown): data is UserWithPost[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "user_id" in item &&
        "username" in item &&
        "email" in item &&
        "role" in item &&
        "users_created_at" in item &&
        "users_updated_at" in item &&
        "post_id" in item &&
        "title" in item &&
        "content" in item &&
        "posts_created_at" in item &&
        "posts_updated_at" in item
    )
  );
}

export function useGetUserWithPosts(id: number) {
  const [userWithPosts, setUsersWithPosts] = useState<UserWithPost[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  async function fetchData(signal?: AbortSignal) {
    try {
      const res = await fetch(`http://localhost:3333/api/users/posts/${id}`, {
        signal,
      });
      if (!res.ok) {
        throw new Error(`Erreur : ${res.status}`);
      }

      const data = await res.json();
      if (!userWithPostsChecking(data)) {
        throw new Error("Format de donnée invalide");
      }

      setUsersWithPosts(data);
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => controller.abort();
  });

  return {
    userWithPosts,
    loading,
  };
}

export function useAllUsersWithPosts() {
  const [AllUsersWithPosts, setAllUsersWithPosts] = useState<
    UserWithPost[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      fetch("http://localhost:3333/api/users/posts/get/all", {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            return { message: `Erreur : ${res.status}` };
          }
          return res.json();
        })
        .then((data) => {
          if (!userWithPostsChecking(data)) {
            return { message: "Format de donnée invalide" };
          }
          setAllUsersWithPosts(data);
        })
        .catch((error) => {
          return { message: extractErrorMessage(error) };
        })
        .finally(() => setLoading(false));
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return { AllUsersWithPosts, loading };
}

export type Team = {
  id: number;
  name: string;
  wins: number;
  loses: number;
  draws: number;
  createdAt: string;
  updatedAt: string;
};

function teamsChecking(data: unknown): data is Team[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "id" in item &&
        "name" in item &&
        "wins" in item &&
        "loses" in item &&
        "draws" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    )
  );
}

export function useGetTeams() {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData(signal?: AbortSignal) {
    try {
      const response = await fetch("http://localhost:3333/api/teams", {
        signal,
      });
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status}`);
      }

      const data = await response.json();
      if (!teamsChecking(data)) {
        return { message: "Format de donnée invalide" };
      }

      setTeams(data);
    } catch (error) {
      return { message: extractErrorMessage(error) };
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => controller.abort();
  });
  return { teams, loading };
}

export type TeamWithPlayers = {
  p_firstname: string;
  p_lastname: string;
  team_id: number;
  team_name: string;
  wins: number;
  loses: number;
  draws: number;
  position: Position;
  number: number;
  status: "opérationnel" | "suspendu" | "blessé" | "inconnu";
};

// function teamWithPlayersChecking(data: unknown): data is TeamWithPlayers[] {
//   return (
//     Array.isArray(data) &&
//     data.every(
//       (item) =>
//         item !== null &&
//         typeof item === "object" &&
//         "p_firstname" in item &&
//         "p_lastname" in item &&
//         "team_id" in item &&
//         "team_name" in item &&
//         "wins" in item &&
//         "loses" in item &&
//         "draws" in item &&
//         "position" in item &&
//         "number" in item &&
//         "status" in item
//     )
//   );
// }

// export function useGetTeamsWithPlayers() {
//   const [teamsWithPlayers, setTeamsWithPlayers] = useState<
//     TeamWithPlayers[] | null
//   >(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchData() {
//       setLoading(true);
//       fetch("http://localhost:3333/api/teams/players/get/all", {
//         signal: controller.signal,
//       })
//         .then((res) => {
//           if (!res.ok) {
//             return { message: `Erreur : ${res.status}` };
//           }
//           return res.json();
//         })
//         .then((data) => {
//           if (!teamWithPlayersChecking(data)) {
//             return { message: "Format de donnée invalide" };
//           }
//           setTeamsWithPlayers(data);
//         })
//         .catch((error) => {
//           return { message: extractErrorMessage(error) };
//         })
//         .finally(() => setLoading(false));
//     }

//     fetchData();
//     return () => controller.abort();
//   }, []);

//   return { teamsWithPlayers, loading };
// }

export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

function postsChecking(data: unknown): data is Post[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "id" in item &&
        "userId" in item &&
        "title" in item &&
        "title" in item &&
        "content" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    )
  );
}

export function useGetPosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);

      fetch("http://localhost:3333/api/posts", {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            return { message: `Erreur : ${res.status}` };
          }
          return res.json();
        })
        .then((data) => {
          if (!postsChecking(data)) {
            return { message: "Format de donnée invalide" };
          }
          setPosts(data);
        })
        .catch((error) => {
          return { message: extractErrorMessage(error) };
        })
        .finally(() => setLoading(false));
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return { posts, loading };
}

export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  teamId: number;
  number: number;
  position: Position;
  status: "opérationnel" | "suspendu" | "blessé" | "inconnu";
  createdAt: string;
  updatedAt: string;
};

function playersChecking(data: unknown): data is Player[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "id" in item &&
        "firstName" in item &&
        "lastName" in item &&
        "teamId" in item &&
        "number" in item &&
        "position" in item &&
        "status" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    )
  );
}

export function useGetPlayers() {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      fetch("http://localhost:3333/api/players", {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            return { message: `Erreur : ${res.status}` };
          }
          return res.json();
        })
        .then((data) => {
          if (!playersChecking(data)) {
            return { message: "Format de donnée invalide" };
          }
          setPlayers(data);
        })
        .catch((error) => {
          return { message: extractErrorMessage(error) };
        })
        .finally(() => setLoading(false));
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return { players, loading };
}

export type Incident = {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

function incidentsChecking(data: unknown): data is Incident[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "id" in item &&
        "type" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    )
  );
}

export function useGetIncidents() {
  const [incidents, setIncidents] = useState<Incident[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      fetch("http://localhost:3333/api/incidents", {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            return { message: `Erreur : ${res.status}` };
          }
          return res.json();
        })
        .then((data) => {
          if (!incidentsChecking(data)) {
            return { message: "Format de donnée invalide" };
          }
          setIncidents(data);
        })
        .catch((error) => {
          return { message: extractErrorMessage(error) };
        })
        .finally(() => setLoading(false));
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return { incidents, loading };
}

export type Game = {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  createdAt: string;
  updatedAt: string;
};

function gamesChecking(data: unknown): data is Game[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "homeTeamId" in item &&
        "awayTeamId" in item &&
        "homeScore" in item &&
        "awayScore" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    )
  );
}

export function useGetGames() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);

      fetch("http://localhost:3333/api/games", {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            return { message: `Erreur : ${res.status}` };
          }
          return res.json();
        })
        .then((data) => {
          if (!gamesChecking(data)) {
            return { message: "Format de donnée invalide" };
          }
          setGames(data);
        })
        .catch((error) => {
          return { message: extractErrorMessage(error) };
        })
        .finally(() => setLoading(false));
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return { games, loading };
}
