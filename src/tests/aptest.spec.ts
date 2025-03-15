import { test, expect } from "./baseTest";


test(`api testing POST request1`, { tag: ['@api'] }, async ({ apiRequest, globalContext, testApiJsonData, logger}) => {

    let payload = testApiJsonData["test1"]["rest_test1"]["payload"];

    let resp = await apiRequest.post('/booking', {
        data: payload
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

    globalContext.contextData["resp1_bookingid"] = (await resp.json())["bookingid"];
    await logger.addRESTAllureLogs(resp);

});

test(`api testing GET request2`, { tag: ['@api'] }, async ({ apiRequest, globalContext, logger}) => {

    let resp = await apiRequest.get(`/booking/${globalContext.contextData["resp1_bookingid"]}`);
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

    let resp1_uid = globalContext.contextData["resp1_bookingid"]
    console.log(resp1_uid);

    await logger.addRESTAllureLogs(resp);

    expect(resp.status()).toBe(200);

});

test(`api testing DELETE request2`, { tag: ['@api'] }, async ({ apiRequest, globalContext, logger}) => {

    let resp = await apiRequest.delete(`/booking/${globalContext.contextData["resp1_bookingid"]}`,{
        headers:{
            Cookie:`token=${process.env.ACCESS_TOKEN}`
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
    console.log(resp.headersArray());
    expect(resp.status()).toBe(201);

});