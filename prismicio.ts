import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

import config from './slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const { repositoryName } = config;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'about',
    path: '/about',
  },
  {
    type: 'work',
    path: '/work',
  },
  {
    type: 'contact',
    path: '/contact',
  },
  {
    type: 'case',
    path: '/work/:uid',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param clientConfig - Configuration for the Prismic client.
 */
export const createClient = (
  clientConfig: prismicNext.CreateClientConfig = {},
) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...clientConfig,
  });

  return client;
};
