import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const GET: RequestHandler = (requestEvent: RequestEvent) => {
    return api(requestEvent);
};

export async function POST(requestEvent: RequestEvent) {
    return api(requestEvent);
}

export async function DELETE(requestEvent: RequestEvent) {
    return api(requestEvent);
}

export async function PATCH(requestEvent: RequestEvent) {
    let t = (await requestEvent.request.formData().then(formData => formData.get("text")))
    return api(requestEvent, {
        text: t
    })
}