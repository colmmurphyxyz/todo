import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const GET: RequestHandler = (requestEvent: RequestEvent) => {
    return api(requestEvent);
};

export async function POST(requestEvent: RequestEvent) {
    return api(requestEvent);
}

export async function DELETE(requestEvent: RequestEvent) {
    const url = requestEvent.url;

    return new Response("200", {
        status: 200
    })
}