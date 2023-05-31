import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import * as Sentry from '@sentry/angular-ivy';

// Sentry.init({
//   dsn: 'https://fd99289f841a4dbd8e8e05ade291e5dd@o4505082115129344.ingest.sentry.io/4505082130923520',
//   integrations: [
//     // Registers and configures the Tracing integration,
//     // which automatically instruments your application to monitor its
//     // performance, including custom Angular routing instrumentation
//     new Sentry.BrowserTracing({
//       tracePropagationTargets: ['localhost', 'https://yourserver.io/api'],
//       routingInstrumentation: Sentry.routingInstrumentation,
//     }),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
