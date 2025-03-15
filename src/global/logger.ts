import { attachment, step as allurestep, ContentType, logStep, Status } from "allure-js-commons";

export default class AllureLogger {

    public async addRESTAllureLogs(resp, stepName = 'REST RESPONSE DETAILS') {
        await allurestep(stepName, async () => {
            await allurestep('rest url ' + resp.url(), async () => {
            });
            await allurestep('rest status code ' + resp.status(), async () => {
            });
            await attachment('rest response', JSON.stringify((await resp.json())), ContentType.JSON);
        });
    }

    async logstep(stepName?: string) {
        await allurestep(stepName, async () => {
        });
    }

    async logStep(stepDesc: string, status: string='pass') {
        switch (status.toLowerCase()) {
            case 'pass':
                await logStep(stepDesc, Status.PASSED);
                break;
            case 'fail':
                await logStep(stepDesc, Status.FAILED);
                break;
            case 'skip':
                await logStep(stepDesc, Status.SKIPPED);
                break;
            case 'broken':
                await logStep(stepDesc, Status.BROKEN);
                break;
            default:
                await logStep(stepDesc, Status.PASSED);
                break;
        }
    }

}
