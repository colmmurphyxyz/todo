import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const GET: RequestHandler = (requestEvent: RequestEvent) => {
    return api(requestEvent);
};

export async function POST(requestEvent: RequestEvent) {
    let formData;
    await requestEvent.request.formData().then(data => formData = data)
    return api(requestEvent, formData);
}

export async function DELETE(requestEvent: RequestEvent) {
    return api(requestEvent);
}

export async function PATCH(requestEvent: RequestEvent) {
    let formData: FormData;
    await requestEvent.request.formData().then(data => formData = data)
    let data: Record<string, string> = {
        text: formData!.get("text") as string,
        done: formData!.get("done") as string
    }
    return api(requestEvent, data);
}