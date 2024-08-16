export type ServerData = {
  region: string;
  status: string;
  roles: string[];
  server_issue: string | null;
  strict: boolean;
  results: {
    services: {
      database: boolean;
      redis: boolean;
    };
    stats: {
      online: number;
      servers_count: number;
      session: number;
      server: {
        active_connections: number;
        cpu_load: number;
        timers: number;
        wait_time: number;
        workers: [
          string,
          {
            idle: number;
            recently_blocked_keys: string[];
            time_to_return: number;
            top_keys: string[];
            wait_time: number;
            waiting: number;
            workers: number;
          }
        ][];
      };
    };
  };
};
