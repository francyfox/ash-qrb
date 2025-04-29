import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/index";
import type Route1 from "./routes/health/index";
import type Route2 from "./routes/s/upload/(post)";
import type Route3 from "./routes/s/private/auth/(post)";
import type Route4 from "./routes/s/private/auth/callback/(post)";
import type Route5 from "./routes/s/private/auth/logout/(post)";
import type Route6 from "./routes/s/private/users/(post)";
import type Route7 from "./routes/s/private/users/(get)";
import type Route8 from "./routes/s/private/users/[id]";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/", typeof Route0>
              & ElysiaWithBaseUrl<"/health", typeof Route1>
              & ElysiaWithBaseUrl<"/s/upload", typeof Route2>
              & ElysiaWithBaseUrl<"/s/private/auth", typeof Route3>
              & ElysiaWithBaseUrl<"/s/private/auth/callback", typeof Route4>
              & ElysiaWithBaseUrl<"/s/private/auth/logout", typeof Route5>
              & ElysiaWithBaseUrl<"/s/private/users", typeof Route6>
              & ElysiaWithBaseUrl<"/s/private/users", typeof Route7>
              & ElysiaWithBaseUrl<"/s/private/users/:id", typeof Route8>
}