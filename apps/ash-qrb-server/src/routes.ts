import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/index";
import type Route1 from "./routes/health/index";
import type Route2 from "./routes/s/auth/(post)";
import type Route3 from "./routes/s/auth/callback/(post)";
import type Route4 from "./routes/s/auth/logout/(post)";
import type Route5 from "./routes/s/users/(post)";
import type Route6 from "./routes/s/users/(get)";
import type Route7 from "./routes/s/upload/(post)";
import type Route8 from "./routes/s/users/[id]";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/", typeof Route0>
              & ElysiaWithBaseUrl<"/health", typeof Route1>
              & ElysiaWithBaseUrl<"/s/auth", typeof Route2>
              & ElysiaWithBaseUrl<"/s/auth/callback", typeof Route3>
              & ElysiaWithBaseUrl<"/s/auth/logout", typeof Route4>
              & ElysiaWithBaseUrl<"/s/users", typeof Route5>
              & ElysiaWithBaseUrl<"/s/users", typeof Route6>
              & ElysiaWithBaseUrl<"/s/upload", typeof Route7>
              & ElysiaWithBaseUrl<"/s/users/:id", typeof Route8>
}