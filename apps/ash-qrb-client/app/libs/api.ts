import { treaty } from "@elysiajs/eden"
import "ash-qrb-server"

export const api = treaty<Routes>('http://localhost:3000')