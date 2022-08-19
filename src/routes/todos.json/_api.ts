import type { RequestEvent } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = async (requestEvent: RequestEvent) => {
    let body = "";
    let status = 500;

    switch (requestEvent.request.method.toUpperCase()) {
        case "GET":
            body = JSON.stringify(todos);
            status = 200;
            break;
        case "POST":
            if (requestEvent.url.searchParams.get("method")?.toUpperCase() === "DELETE") {
                console.log("deleting");
                const foo = todos.filter(todo => todo.uid != requestEvent.url.searchParams.get("uid"));
                todos = foo;
                status = 200;
            } else {
                await requestEvent.request.formData().then((data) => {
                    todos.push({
                        uid: `${Date.now()}`,
                        created_at: new Date(),
                        text: data.get("text") as string,
                        done: false
                    })
                    body = JSON.stringify(data);
                    status = 201
                }).catch((error) => {
                    console.log(`error occured: ${error}`);
                })
            }
        
            return new Response("", {
                status: 303,
                headers: {
                    location: "/"
                }
            });
            break;
        case "DELETE":
            todos = todos.filter(todo => { todo.uid !== requestEvent.url.searchParams.get("uid")})
            return new Response("303", {
                status: 303,
                headers: {
                    location: "/"
                }
            });
            break;

        default:
            break;
    }

    if (requestEvent.request.method.toUpperCase() !== "GET") {
        return new Response(body, {
            status: 303,
            headers: {
                loaction: "/"
            }
        });
    }

    return new Response(body, {
        status: status
    });
}