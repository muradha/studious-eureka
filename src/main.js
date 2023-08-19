import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

const port = 3000;

web.listen(port, () => {
    logger.info(`Server listen on port ${port}`);
})