import { TextEncoder } from "util";
import "isomorphic-fetch";

global.TextEncoder = TextEncoder;
