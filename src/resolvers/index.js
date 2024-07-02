import Resolver from "@forge/resolver";
import { fetch } from "@forge/api";
const resolver = new Resolver();

resolver.define("getevents", async (req) => {
  const APIKEY =
    "0bdc4ba6f9ada0084f0ddc285829b10af7c1cc25b8d7529566ecd19231c8f0b741df06d6f2f99776a86fcd0a1f5c283bc67fc750189ca414ceba645d971f47a0a0c95548f220cd7a78729bf36a4f3b9cc5406014989f586cce44ba535d35561d560721d925669bda4afca34fe5f710";

  if (req.payload.location) {
    const page = 10;
    const url = `https://api.humanitix.com/v1/events?page=${page}`;
    const response = await fetch(url, {
      headers: {
        "x-api-key": APIKEY,
      },
    });

    if (!response.ok) {
      const errmsg = `Error from humantix API: ${
        response.status
      } ${await response.text()}`;
      console.error(errmsg);
      throw new Error(errmsg);
    }

    const pages = await response.json();

    return pages;
  } else {
    return null;
  }
});

export const handler = resolver.getDefinitions();
