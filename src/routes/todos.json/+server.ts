import type { RequestEvent, RequestHandler } from "@sveltejs/kit";

let todos: Todo[] = [];

export const GET: RequestHandler = () => {
    // return new Response(todos.toString());
    return new Response(JSON.stringify(todos));
};

export async function POST(requestEvent: RequestEvent) {
    await requestEvent.request.formData().then((data) => {
        todos.push({
            created_at: new Date(),
            text: data.get("text") as string,
            done: false
        })
    }).catch((error) => {
        console.log(`error occured: ${error}`);
    })

    return new Response("303", {
        status: 303,
        headers: {
            location: "/"
        }
    });
}