import { writeCSV } from "../utils/testdataloader";
import { lighthouseTest, lighthouseReporterConfig } from "./baseTest";
import { playAudit, playwrightLighthouseResult } from 'playwright-lighthouse';

lighthouseTest.describe('Authenticated route after globalSetup', () => {
        lighthouseTest(`login and check the home page title INDICATOR`, { tag: ['@lh1234'] }, async ({ authenticatePage }) => {
                let res: playwrightLighthouseResult = await playAudit({
                        page: authenticatePage,
                        thresholds: {
                                performance: 50,
                                accessibility: 50,
                                'best-practices': 50,
                                seo: 50,
                                pwa: 50,
                        },
                        port: 9222,
                        reports: lighthouseReporterConfig
                });
                let resObj = {
                        "url": res["lhr"]["finalDisplayedUrl"],
                        "score": res["lhr"]["categories"]["accessibility"]["score"] * 100,
                        "best-practice": res["lhr"]["categories"]["best-practices"]["score"]*100,
                        "performance": res["lhr"]["categories"]["performance"]["score"] * 100,
                        "seo": res["lhr"]["categories"]["seo"]["score"] * 100,
                }
                await writeCSV("src/data/csv/outputs/lh.csv", [resObj],'a');
        });
});
