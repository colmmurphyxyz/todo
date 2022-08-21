import type { RequestEvent } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = async (requestEvent: RequestEvent, data?: Record<string, string>) => {
    let body = "";
    let status = 500;

    switch (requestEvent.request.method.toUpperCase()) {
        case "GET":
            body = JSON.stringify(todos);
            status = 200;
            break;
        case "POST":
            const method = requestEvent.url.searchParams.get("method")?.toUpperCase();
            switch (method) {
                case "DELETE":
                    const foo = todos.filter(todo => todo.uid != requestEvent.url.searchParams.get("uid"));
                    todos = foo;
                    status = 200;
                    break;
                case "PATCH":
                    todos = todos.map(todo => {
                        if (todo.uid === requestEvent.url.searchParams.get("uid")) {
                            todo.text = data!.get("text") as string;
                        }
                        return todo;
                    })
                    status = 200;
                    break;
                default:    // case "POST"
                console.log("posting");
                    todos.push({
                        uid: `${Date.now()}`,
                        created_at: new Date(),
                        text: data!.get("text") as string,
                        done: false
                    })
                    body = JSON.stringify(data);
                    status = 201
                    // await requestEvent.request.formData().then((data) => {
                        // todos.push({
                        //     uid: `${Date.now()}`,
                        //     created_at: new Date(),
                        //     text: data.get("text") as string,
                        //     done: false
                        // })
                        // body = JSON.stringify(data);
                        // status = 201
                    // }).catch((error) => {
                    //     console.log(`error occured: ${error}`);
                    // })
                    break;
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
        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === requestEvent.url.searchParams.get("uid")) {
                    todo.text = data!.text as string;
                }
                return todo;
            })
            status = 200;
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