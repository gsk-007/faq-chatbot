import app from "./app.js";

import { config } from "./config/config.js";

app.listen(config.api.port, () => {
  console.log(
    `🚀 ${config.api.platform} server running at http://localhost:${config.api.port}`
  );
});