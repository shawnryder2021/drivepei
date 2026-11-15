import data from './buyer-resources.json';
export const buyerResources = data;
export const resourceBySlug = (slug: string) => buyerResources.find(resource => resource.slug === slug);
export const resourcesForGuide = (slug: string) => buyerResources.filter(resource => resource.guides.includes(slug));
