import { test } from './baseTest';

test(`set up for API`, {}, async ({ apiRequest, globalContext}) => {
  let resp = await apiRequest.post(`${process.env.REST_BASE_URL}/auth`, {
        data: {
            "username": process.env.REST_USER_NAME,
            "password": process.env.REST_PASSWORD,
        }
    });
    console.log(resp.status());
    console.log(await resp.body());
    console.log(resp.headers());
    console.log(resp.url());
    console.log(await resp.text());
    console.log(resp.statusText());

    console.log(resp.status());
    console.log(resp.ok());
    console.log((await resp.json()));
    console.log(resp.headersArray());

    process.env.ACCESS_TOKEN = (await resp.json())["token"];
});
