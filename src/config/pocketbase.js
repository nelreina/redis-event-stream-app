import "dotenv/config";

import PocketBase from "pocketbase";
import EventSource from "eventsource";

const POCKETBASE = process.env["POCKETBASE_URL"];

global.EventSource = EventSource;
export const pbAdmin = new PocketBase(POCKETBASE);
