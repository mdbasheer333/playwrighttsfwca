import { lighthouseTest, lighthouseReporterConfig } from "./baseTest";
import { playAudit } from 'playwright-lighthouse';

lighthouseTest.describe('Authenticated route after globalSetup', () => {
        lighthouseTest(`login and check the home page title INDICATOR`, { tag: ['@lh1234'] }, async ({ authenticatePage }) => {
                await playAudit({
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
        });
});
