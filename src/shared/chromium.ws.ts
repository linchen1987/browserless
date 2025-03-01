import {
  APITags,
  BrowserWebsocketRoute,
  CDPLaunchOptions,
  ChromiumCDP,
  Request,
  SystemQueryParameters,
  WebsocketRoutes,
} from '@browserless.io/browserless';
import { Duplex } from 'stream';

export interface QuerySchema extends SystemQueryParameters {
  launch?: CDPLaunchOptions | string;
}

export default class ChromiumCDPRoute extends BrowserWebsocketRoute {
  auth = true;
  browser = ChromiumCDP;
  concurrency = true;
  description = `Launch and connect to Chromium with a library like puppeteer or others that work over chrome-devtools-protocol.`;
  path = [WebsocketRoutes['/'], WebsocketRoutes.chromium];
  tags = [APITags.browserWS];
  handler = async (
    req: Request,
    socket: Duplex,
    head: Buffer,
    browser: ChromiumCDP,
  ): Promise<void> => browser.proxyWebSocket(req, socket, head);
}
