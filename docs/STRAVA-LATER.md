# Strava — deferred final phase

The user requested that Strava API work and implementation be kept until last. The current build contains no Strava authentication, token storage, requests, activity data, or fabricated statistics. `/cycling` is a journal empty state. RideZilla is a separate, existing resume project.

When this phase starts:

1. Confirm which activities and privacy levels Saagar wants public. Do not publish private activities or sensitive route coordinates by default.
2. Register the portfolio application and confirm its callback domain. Review the current official documentation:
   - https://developers.strava.com/docs/authentication/
   - https://developers.strava.com/docs/reference/
   - https://developers.strava.com/docs/rate-limits/
3. Add Vercel server functions for authorization and callback handling, including request-bound state validation and owner-only authorization.
4. Keep client secrets and refresh tokens in server-only configuration and durable private storage. Never use `VITE_` variables for secrets or send tokens to the browser.
5. Refresh credentials server-side, cache a curated public response, and handle rate limits, revoked access, empty history, pagination, time zones, and failures.
6. Build totals, recent rides, monthly activity, and optional routes from real records. Existing decorative illustrations are not GPS tracks or activity charts.
7. Verify the full flow with the owner's Strava authorization before describing it as connected.

No credentials are needed for the current portfolio. Authentication and integration remain unimplemented and untested.
